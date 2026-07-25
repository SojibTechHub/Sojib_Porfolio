import express from 'express';
import { getTestimonials } from '../controllers/testimonialController.js';
import { adminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/testimonials', getTestimonials);

export const testimonialRoutes = router;
export const adminTestimonialRoutes = router;
