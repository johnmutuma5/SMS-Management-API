import { Router } from 'express';
import ContactsController from './contacts.controller'

const contactsRouter = new Router();

contactsRouter
  .route('/contacts')
  .post(ContactsController.createContact);

contactsRouter
  .route('/contacts/:id')
  .delete(ContactsController.deleteContact); // TODO create deleteContact in ContactsController

export default contactsRouter;

