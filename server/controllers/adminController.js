import Project from '../models/Project.js';
import Message from '../models/Message.js';
import Blog from '../models/Blog.js';
import Skill from '../models/Skill.js';
import { successResponse } from '../utils/apiResponse.js';

export const getStats = async (req, res, next) => {
  try {
    const [totalProjects, unreadMessages, totalBlogPosts, totalSkills] = await Promise.all([
      Project.countDocuments(),
      Message.countDocuments({ read: false }),
      Blog.countDocuments(),
      Skill.countDocuments(),
    ]);
    successResponse(res, { totalProjects, unreadMessages, totalBlogPosts, totalSkills });
  } catch (error) { next(error); }
};

export const getRecentMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(5);
    successResponse(res, messages);
  } catch (error) { next(error); }
};
