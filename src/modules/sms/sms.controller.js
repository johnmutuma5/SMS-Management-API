import SMS, { SmsStatus } from './sms.model';
import Contact  from '../contacts/contacts.model'

const handleBadRequest = (res) => {
  return (data) => {
    return res.status(400).json(data)
  }
}

export default class SMSController {

  /**
   * Save a new Sms 
   *
   */
  static async createSms(req, res, next) {
    
    const { body:  {
      message,
      senderPhone,
      recipientPhone,
      status: smsStatus,
    } } = req;
    // uppercase first letter in status and lowercase other leters
    const transformSmsStatus = (
      smsStatus.charAt(0).toUpperCase() +
      smsStatus.slice(1).toLowerCase()
    );
    // assert only known statuses
    let mappedSmsStatus = SmsStatus[transformSmsStatus];
    switch (mappedSmsStatus) {
      case SmsStatus.Draft:
      case SmsStatus.Sent:
      case SmsStatus.Delivered:
        break;
      default:
        return handleBadRequest(res)({
          status: 'fail',
          message: 'unknown sms status value in body',
          data: { validValues: [ 'Draft', 'Sent', 'Delivered' ] },
        });
    }
    // find the sender
    const sender = await Contact.findOne({ phone: senderPhone })
    if (!sender) {
      return res.status(404).json({
        message: 'Sender not found',
      })
    }
    // find the recipient
    const recipient = await Contact.findOne({ phone: recipientPhone })
    if (!recipient) {
      return res.status(404).json({
        message: 'Recipient not found',
      })
    }

    // create the sms
    const sms = await SMS.create({
      message,
      sender: sender._id,
      recipient: recipient._id,
      status: mappedSmsStatus,
    });

    const createdSms = {
      _id: sms._id,
      message: sms.message,
      sender: sender.phone,
      recipient: recipient.phone,
      status: SmsStatus[mappedSmsStatus],
    }

    return res.status(201).json({
      status: 'success',
      message: 'Successfully recorded SMS',
      data: { createdSms },
    })
  }
}
