import { Router } from 'express';
import ContactsController from './contacts.controller'

const contactsRouter = new Router();

contactsRouter
  .route('/contacts')
  .post(ContactsController.createContact);

export default contactsRouter;
