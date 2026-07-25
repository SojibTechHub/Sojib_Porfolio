import { Router } from 'express';
import { getSkills, getAllSkillsAdmin, createSkill, updateSkill, deleteSkill } from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getSkills);

export default router;

export const adminSkillRoutes = Router();
adminSkillRoutes.get('/', protect, getAllSkillsAdmin);
adminSkillRoutes.post('/', protect, createSkill);
adminSkillRoutes.put('/:id', protect, updateSkill);
adminSkillRoutes.delete('/:id', protect, deleteSkill);
