import Contact from './contacts.model';
import SMS from '../sms/sms.model';
import { isValidId } from '../../shared';

export default class ContactsController {

  constructor(){}

  /**
   * Create a new contact record
   */
  static async createContact(req, res, next) {
    const { phone, name } = req.body;
    const contactExists = (await Contact.count({ phone })) > 0;

    if(contactExists) {
      // Duplication
      return res.status(409).json({
        status: "fail",
        message: "Contact already exists",
        data: {},
      });
    }
    
    // 😀 proceed to create the contact
    try {
      const contact = await Contact.create({ name, phone });
      // success
      return res.status(201).json({
        status: "success",
        message: "Contact created successfully",
        data: { contact },
      });
    } catch (error) {
      /* istanbul ignore next */
      console.error(error);
      return res.status(500).json({
        status: 'fail',
        message: 'Could not create contact try again later!'
      });
    }
  }

  /**
   * Delete contact
   */
  static async deleteContact (req, res, next) {
    const { id: _id } = req.params;
    if (!(await isValidId(_id))) {
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid conctact object id',
      });
    }
    // delete the contact
    const { deletedCount: deleteContactCount } = await Contact.deleteOne({ _id });
    // delete all associated SMSs
    const { deletedCount: deleteSmsCount } = await SMS.deleteMany({
      $or: [ { sender: _id }, { recipient: _id } ],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Contact deleted successfully',
      data: {
        deleteContactCount,
        deleteSmsCount,
      },
    });
  }
}
