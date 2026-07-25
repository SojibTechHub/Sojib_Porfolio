import Experience from '../models/Experience.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.find().sort({ startDate: -1 });
    const work = experience.filter(e => e.type === 'work');
    const education = experience.filter(e => e.type === 'education');
    successResponse(res, { experience, work, education });
  } catch (error) { next(error); }
};

export const createExperience = async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body);
    successResponse(res, exp, 'Experience created', 201);
  } catch (error) { next(error); }
};

export const updateExperience = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exp) return errorResponse(res, 'Experience not found', 404);
    successResponse(res, exp, 'Experience updated');
  } catch (error) { next(error); }
};

export const deleteExperience = async (req, res, next) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return errorResponse(res, 'Experience not found', 404);
    successResponse(res, null, 'Experience deleted');
  } catch (error) { next(error); }
};
