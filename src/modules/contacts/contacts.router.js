import { Router } from 'express';
import ContactsController from './contacts.controller'

const contactsRouter = new Router();

contactsRouter
  .route('/')
  .post(ContactsController.createContact);

contactsRouter
  .route('/:id')
  .delete(ContactsController.deleteContact);

export default contactsRouter;

