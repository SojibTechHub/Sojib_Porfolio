import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  iconName: { type: String, default: '' },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'tools'],
    required: true,
  },
  proficiency: { type: Number, min: 0, max: 100, required: true },
  yearsExp: { type: Number, default: 0 },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Skill', skillSchema);
