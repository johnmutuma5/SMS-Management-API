import { Router } from 'express';
import SMSController from './sms.controller';

const smsRouter = new Router();

smsRouter
  .route('/add')
  .post(SMSController.createSms);

export default smsRouter;
