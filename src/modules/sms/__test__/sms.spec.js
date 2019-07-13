import chai from 'chai';
import chaiHttp from 'chai-http';
import Contact from '../../contacts/contacts.model';
import SMS from '../../sms/sms.model';

import app from '../../../app';


chai.use(chaiHttp);

const { expect } = chai;

describe('SMS', () => {

  afterEach(async () => {
    await Contact.deleteMany({});
    await SMS.deleteMany({});
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
    await SMS.deleteMany({});
  });

  it('should handle unkown sender', async () => {
    const resp = await chai.request(app)
      .post('/v1/sms/add')
      .send({
        status: 'draft',
        message: 'Test this message',
        senderPhone: '0728655088',
        recipientPhone: '0725280260',
      });
    expect(resp.statusCode).to.equal(404);
    expect(resp.body.message).to.equal('Sender not found');
  });

  it('should handle unkown recipient', async () => {
    const sender = await Contact.create({ name: 'Laz', phone: '0725280260' });
    const resp = await chai.request(app)
      .post('/v1/sms/add')
      .send({
        status: 'draft',
        message: 'Test this message',
        senderPhone: sender.phone,
        recipientPhone: '0728655088',
      });
    expect(resp.statusCode).to.equal(404);
    expect(resp.body.message).to.equal('Recipient not found');
  });

  describe('with valid contacts', async () => {
    let sender, recipient;

    beforeEach(async () => {
      sender = await Contact.create({ name: 'Laz', phone: '0725280260' });
      recipient = await Contact.create({
        name: 'Sheelah',
        phone: '0728655088',
      });
    });

    it('should handle invalid sms status', async () => {
      // send request with invalid status
      const resp = await chai.request(app)
        .post('/v1/sms/add')
        .send({
          status: 'invaildStatus',
          message: 'Test this message',
          senderPhone: sender.phone,
          recipientPhone: recipient.phone,
        });

      expect(resp.statusCode).to.equal(400);
      expect(resp.body.message).to.equal('unknown sms status value in body');
    });

    it('should send an sms', async () => {
      // send request with invalid status
      const smsData = {
        status: 'delivered',
        message: 'Test this message',
        senderPhone: sender.phone,
        recipientPhone: recipient.phone,
      };
      const resp = await chai.request(app)
        .post('/v1/sms/add')
        .send(smsData);
      expect(resp.statusCode).to.equal(201);
      expect(resp.body.data.createdSms.message).to.equal(smsData.message);
    });
  })
})

