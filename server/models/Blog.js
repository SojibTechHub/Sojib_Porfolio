import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String, maxlength: 300 },
  coverImage: { type: String, default: '' },
  category: { type: String, default: 'general' },
  tags: [{ type: String }],
  published: { type: Boolean, default: false },
  readTime: { type: Number, default: 5 },
  author: { type: String, default: 'Sojib' },
}, { timestamps: true });

blogSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  if (!this.excerpt) {
    this.excerpt = this.content.substring(0, 250).replace(/<[^>]*>/g, '') + '...';
  }
  if (!this.readTime) {
    const words = this.content.split(/\s+/).length;
    this.readTime = Math.max(1, Math.ceil(words / 200));
  }
  next();
});

export default mongoose.model('Blog', blogSchema);
