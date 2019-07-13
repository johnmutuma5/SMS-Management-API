import mongoose, { Schema } from 'mongoose';

const smsSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
  message: {
    type: String,
  },
  status: {
    type: Number,
  },
});

export const SmsStatus = {};
(function (SmsStatus) {
    SmsStatus[SmsStatus["Draft"] = 0] = "Draft";
    SmsStatus[SmsStatus["Sent"] = 1] = "Sent";
    SmsStatus[SmsStatus["Delivered"] = 2] = "Delivered";
})(SmsStatus || (SmsStatus = {}));

export default mongoose.model('SMS', smsSchema);
