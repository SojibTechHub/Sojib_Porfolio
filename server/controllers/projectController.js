import Project from '../models/Project.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getProjects = async (req, res, next) => {
  try {
    const filter = { visible: true };
    if (req.query.featured) filter.featured = true;
    if (req.query.category) filter.category = req.query.category;
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    successResponse(res, projects);
  } catch (error) { next(error); }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return errorResponse(res, 'Project not found', 404);
    successResponse(res, project);
  } catch (error) { next(error); }
};

export const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ featured: true, visible: true }).sort({ order: 1 });
    successResponse(res, projects);
  } catch (error) { next(error); }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    successResponse(res, project, 'Project created', 201);
  } catch (error) { next(error); }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return errorResponse(res, 'Project not found', 404);
    successResponse(res, project, 'Project updated');
  } catch (error) { next(error); }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return errorResponse(res, 'Project not found', 404);
    successResponse(res, null, 'Project deleted');
  } catch (error) { next(error); }
};

export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    successResponse(res, projects);
  } catch (error) { next(error); }
};
