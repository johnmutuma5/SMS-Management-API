import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import Contact from '../contacts.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Contacts', () => {

  beforeEach(async () => {
    await Contact.deleteMany({});
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
    expect(resp.body.data.contact.deletedCount).to.equal(1);
  });
})

