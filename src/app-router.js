import { Router } from 'express';

import { contactsRouter } from './modules/contacts';
import { smsRouter } from './modules/sms';

const appRouter = new Router();

// register all modules' routes here
appRouter.use('/contacts', contactsRouter);
appRouter.use('/sms', smsRouter);

export default appRouter;

