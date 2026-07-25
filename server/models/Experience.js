import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  type: { type: String, enum: ['work', 'education'], required: true },
  title: { type: String, required: true },
  company: { type: String, default: '' },
  location: { type: String, default: '' },
  startDate: { type: String, required: true },
  endDate: { type: String, default: '' },
  current: { type: Boolean, default: false },
  description: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Experience', experienceSchema);
