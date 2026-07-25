import { Router } from 'express';
import { getBlogs, getBlogBySlug, getAllBlogsAdmin, createBlog, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

export default router;

export const adminBlogRoutes = Router();
adminBlogRoutes.get('/', protect, getAllBlogsAdmin);
adminBlogRoutes.post('/', protect, createBlog);
adminBlogRoutes.put('/:id', protect, updateBlog);
adminBlogRoutes.delete('/:id', protect, deleteBlog);
