import express from 'express';
import { getExperience, getTestimonials } from '../controllers/experienceController.js';
import { adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/experience', getExperience);
router.get('/testimonials', getTestimonials);

export const experienceRoutes = router;
export const adminExperienceRoutes = router;
