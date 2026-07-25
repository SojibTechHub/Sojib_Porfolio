import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return errorResponse(res, 'Invalid email or password', 401);
    }
    const token = generateToken(admin._id);
    successResponse(res, { token, admin: { email: admin.email } }, 'Login successful');
  } catch (error) { next(error); }
};

export const logout = async (req, res, next) => {
  try {
    successResponse(res, null, 'Logged out successfully');
  } catch (error) { next(error); }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return errorResponse(res, 'No token provided', 401);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = generateToken(decoded.id);
    successResponse(res, { token: newToken }, 'Token refreshed');
  } catch (error) {
    return errorResponse(res, 'Invalid token', 401);
  }
};
