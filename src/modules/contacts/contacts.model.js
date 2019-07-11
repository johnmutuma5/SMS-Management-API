import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
  name: String,
  phone: String,
}); 

export const isValidId = async (value) => {
  return mongoose.Types.ObjectId.isValid(value);
}

export default mongoose.model('Contact', contactSchema);
