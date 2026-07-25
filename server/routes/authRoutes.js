import { Router } from 'express';
import { login, logout, refresh } from '../controllers/authController.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.post('/refresh', refresh);

export default router;
