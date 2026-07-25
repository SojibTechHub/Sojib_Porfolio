import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { validateEnv } from './config/envValidation.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

import projectRoutes from './routes/projectRoutes.js';
import { adminProjectRoutes } from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import { adminSkillRoutes } from './routes/skillRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import { adminBlogRoutes } from './routes/blogRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';

import Experience from './models/Experience.js';
import Testimonial from './models/Testimonial.js';
import { successResponse } from './utils/apiResponse.js';

validateEnv();
await connectDB();

const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.get('/api/profile', async (req, res, next) => {
  try {
    const { default: Profile } = await import('./models/Profile.js');
    let profile = await Profile.findOne();
    if (!profile) profile = await Profile.create({});
    successResponse(res, profile);
  } catch (error) { next(error); }
});

app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api/experience', async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({ startDate: -1 });
    const work = experience.filter(e => e.type === 'work');
    const education = experience.filter(e => e.type === 'education');
    successResponse(res, { experience, work, education });
  } catch (error) { next(error); }
});

app.get('/api/testimonials', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ visible: true }).sort({ order: 1 });
    successResponse(res, testimonials);
  } catch (error) { next(error); }
});

app.get('/api/cv/download', async (req, res, next) => {
  try {
    const Profile = (await import('./models/Profile.js')).default;
    const profile = await Profile.findOne();
    if (profile?.cvUrl) {
      return res.redirect(`${profile.cvUrl}`);
    }
    successResponse(res, { url: null }, 'No CV uploaded yet');
  } catch (error) { next(error); }
});

app.use('/api/admin', adminRoutes);
app.use('/api/admin/projects', adminProjectRoutes);
app.use('/api/admin/skills', adminSkillRoutes);
app.use('/api/admin/blogs', adminBlogRoutes);
app.use('/api/admin/upload', uploadRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
