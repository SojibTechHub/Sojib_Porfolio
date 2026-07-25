import Skill from '../models/Skill.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    const grouped = skills.reduce((acc, s) => {
      (acc[s.category] = acc[s.category] || []).push(s);
      return acc;
    }, {});
    successResponse(res, { skills, grouped });
  } catch (error) { next(error); }
};

export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    successResponse(res, skill, 'Skill created', 201);
  } catch (error) { next(error); }
};

export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!skill) return errorResponse(res, 'Skill not found', 404);
    successResponse(res, skill, 'Skill updated');
  } catch (error) { next(error); }
};

export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return errorResponse(res, 'Skill not found', 404);
    successResponse(res, null, 'Skill deleted');
  } catch (error) { next(error); }
};

export const getAllSkillsAdmin = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    successResponse(res, skills);
  } catch (error) { next(error); }
};
