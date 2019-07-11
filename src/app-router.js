import { Router } from 'express';

import contactsRouter from './modules/contacts';

const appRouter = new Router();

// register all modules' routes here
appRouter.use('/v1', contactsRouter);

export default appRouter;

