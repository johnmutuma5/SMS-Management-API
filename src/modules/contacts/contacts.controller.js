import Contact from './contacts.model';

export default class ContactsController {

  constructor(){}

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
      return res.json({
        status: "success",
        message: "Contact created successfully",
        data: { contact },
      });
    } catch (error) {
      // server error
      console.error(error);
      return res.status(500).json({
        status: 'fail',
        message: 'Could not create contact try again later!'
      });
    }
  }
}
