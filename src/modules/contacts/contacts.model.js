import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
  name: String,
  phone: String,
}); 

export default mongoose.model('Contact', contactSchema);
