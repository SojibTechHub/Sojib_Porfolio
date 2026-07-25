import { Router } from 'express';
import multer from 'multer';
import { uploadImage, uploadCV } from '../controllers/uploadController.js';
import { protect } from '../middleware/authMiddleware.js';

const storage = multer.diskStorage({});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

router.post('/image', protect, upload.single('image'), uploadImage);
router.post('/cv', protect, upload.single('cv'), uploadCV);

export default router;
