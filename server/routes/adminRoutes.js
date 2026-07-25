import { Router } from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getStats } from '../controllers/adminController.js';
import { getProfile, updateProfile, changePassword } from '../controllers/profileController.js';
import Message from '../models/Message.js';
import Experience from '../models/Experience.js';
import Testimonial from '../models/Testimonial.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const router = Router();

router.use(protect);

router.get('/stats', getStats);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/settings/password', changePassword);

// Messages
router.get('/messages', async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    successResponse(res, messages);
  } catch (error) { next(error); }
});

router.put('/messages/:id', async (req, res, next) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!message) return errorResponse(res, 'Message not found', 404);
    successResponse(res, message, 'Message marked as read');
  } catch (error) { next(error); }
});

router.delete('/messages/:id', async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) return errorResponse(res, 'Message not found', 404);
    successResponse(res, null, 'Message deleted');
  } catch (error) { next(error); }
});

// Experience
router.get('/experience', async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({ startDate: -1 });
    successResponse(res, experience);
  } catch (error) { next(error); }
});

router.post('/experience', async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body);
    successResponse(res, exp, 'Experience created', 201);
  } catch (error) { next(error); }
});

router.put('/experience/:id', async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exp) return errorResponse(res, 'Experience not found', 404);
    successResponse(res, exp, 'Experience updated');
  } catch (error) { next(error); }
});

router.delete('/experience/:id', async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return errorResponse(res, 'Experience not found', 404);
    successResponse(res, null, 'Experience deleted');
  } catch (error) { next(error); }
});

// Testimonials
router.get('/testimonials', async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    successResponse(res, testimonials);
  } catch (error) { next(error); }
});

router.post('/testimonials', async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    successResponse(res, testimonial, 'Testimonial created', 201);
  } catch (error) { next(error); }
});

router.put('/testimonials/:id', async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) return errorResponse(res, 'Testimonial not found', 404);
    successResponse(res, testimonial, 'Testimonial updated');
  } catch (error) { next(error); }
});

router.delete('/testimonials/:id', async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return errorResponse(res, 'Testimonial not found', 404);
    successResponse(res, null, 'Testimonial deleted');
  } catch (error) { next(error); }
});

export default router;
