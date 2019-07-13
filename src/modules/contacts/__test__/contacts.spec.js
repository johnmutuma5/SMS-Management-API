import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import Contact from '../contacts.model';
import SMS, { SmsStatus } from '../../sms/sms.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Contacts', () => {

  beforeEach(async () => {
    await Contact.deleteMany({});
    await SMS.deleteMany({});
  });

  afterEach(async () => {
    await Contact.deleteMany({});
    await SMS.deleteMany({});
  });

  it('should add a new contact', async () => {
    const resp = await chai.request(app)
      .post('/v1/contacts/')
      .send({
        name: 'John',
        phone: '0728655088',
      });
    expect(resp.statusCode).to.equal(201);
    expect(resp.body.data.contact.phone).to.equal('0728655088');
  });

  it('should disallow duplicate contacts', async () => {
    const contact = await Contact.create({
      phone: '0728655088',
      name: 'John',
    });
    const resp = await chai.request(app)
      .post('/v1/contacts/')
      .send({
        name: 'John',
        phone: '0728655088',
      });
    expect(resp.statusCode).to.equal(409);
    expect(resp.body.message).to.equal('Contact already exists');
  });

  it('should delete a contact', async () => {
    const contact = await Contact.create({
      phone: '0728655088',
      name: 'John',
    });
    const resp = await chai.request(app)
      .delete(`/v1/contacts/${contact._id}`)
      .send();

    expect(resp.statusCode).to.equal(200);
    expect(resp.body.data.deleteContactCount).to.equal(1);
  });

  it('should delete associated sms on delete contact', async () => {
    const john = await Contact.create({
      phone: '0728655088',
      name: 'John',
    });

    const sheelah = await Contact.create({
      phone: '0725000000',
      name: 'Sheelah',
    });

    // create test SMSs
    await SMS.create({
      sender: sheelah._id,
      recipient: john._id,
      message: 'Hallo, how are you today',
      status: SmsStatus.Delivered,
    });

    await SMS.create({
      sender: john._id,
      recipient: sheelah._id,
      message: 'I am doing well, how about you',
      status: SmsStatus.Delivered,
    });

    const resp = await chai.request(app)
      .delete(`/v1/contacts/${john._id}`)
      .send();

    expect(resp.statusCode).to.equal(200);
    expect(resp.body.data.deleteContactCount).to.equal(1);
    expect(resp.body.data.deleteSmsCount).to.equal(2);
  });
})

