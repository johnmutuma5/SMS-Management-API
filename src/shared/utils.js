import mongoose from 'mongoose';

export const isValidId = async (value) => {
  return mongoose.Types.ObjectId.isValid(value);
}
