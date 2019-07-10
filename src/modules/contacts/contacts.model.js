import mongoose, { Schema } from 'mongoose';

const contactSchema = new Schema({
  name: String,
  phone: Number,
}); 

export default mongoose.model('Contact', contactSchema);
