import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: 'Sojib' },
  role: { type: String, default: 'MERN Stack Developer' },
  bio: { type: String, default: '' },
  location: { type: String, default: 'Bangladesh' },
  availability: { type: Boolean, default: true },
  photo: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  birthDate: { type: String, default: '' },
  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  discord: { type: String, default: '' },
  fiverr: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.model('Profile', profileSchema);
