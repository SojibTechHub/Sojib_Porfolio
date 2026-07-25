import { Router } from 'express';
import { getProjects, getFeaturedProjects, getProjectById, getAllProjectsAdmin, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:id', getProjectById);

export default router;

export const adminProjectRoutes = Router();
adminProjectRoutes.get('/', protect, getAllProjectsAdmin);
adminProjectRoutes.post('/', protect, createProject);
adminProjectRoutes.put('/:id', protect, updateProject);
adminProjectRoutes.delete('/:id', protect, deleteProject);
