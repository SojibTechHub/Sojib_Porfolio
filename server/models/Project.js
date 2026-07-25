import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true, maxlength: 500 },
  longDescription: { type: String, default: '' },
  techStack: [{ type: String }],
  thumbnail: { type: String, default: '' },
  images: [{ type: String }],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  caseStudyUrl: { type: String, default: '' },
  category: {
    type: String,
    enum: ['fullstack', 'frontend', 'api', 'opensource', 'mobile'],
    default: 'fullstack',
  },
  featured: { type: Boolean, default: false },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

projectSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.model('Project', projectSchema);
