import Blog from '../models/Blog.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getBlogs = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find({ published: true })
      .sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Blog.countDocuments({ published: true });
    successResponse(res, { blogs, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) { next(error); }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return errorResponse(res, 'Blog post not found', 404);
    successResponse(res, blog);
  } catch (error) { next(error); }
};

export const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    successResponse(res, blog, 'Blog created', 201);
  } catch (error) { next(error); }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return errorResponse(res, 'Blog not found', 404);
    successResponse(res, blog, 'Blog updated');
  } catch (error) { next(error); }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return errorResponse(res, 'Blog not found', 404);
    successResponse(res, null, 'Blog deleted');
  } catch (error) { next(error); }
};

export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    successResponse(res, blogs);
  } catch (error) { next(error); }
};
