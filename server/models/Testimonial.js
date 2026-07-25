import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: '' },
  company: { type: String, default: '' },
  avatar: { type: String, default: '' },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  review: { type: String, required: true },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Testimonial', testimonialSchema);
