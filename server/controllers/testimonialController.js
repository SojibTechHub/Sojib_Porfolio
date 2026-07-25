import Testimonial from '../models/Testimonial.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ visible: true }).sort({ order: 1 });
    successResponse(res, testimonials);
  } catch (error) { next(error); }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    successResponse(res, testimonial, 'Testimonial created', 201);
  } catch (error) { next(error); }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!testimonial) return errorResponse(res, 'Testimonial not found', 404);
    successResponse(res, testimonial, 'Testimonial updated');
  } catch (error) { next(error); }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return errorResponse(res, 'Testimonial not found', 404);
    successResponse(res, null, 'Testimonial deleted');
  } catch (error) { next(error); }
};

export const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    successResponse(res, testimonials);
  } catch (error) { next(error); }
};
