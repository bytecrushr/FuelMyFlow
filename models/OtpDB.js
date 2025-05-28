import mongoose from 'mongoose';

const OtpDBSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.models.OtpDB || mongoose.model('OtpDB', OtpDBSchema);