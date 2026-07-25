import Profile from '../models/Profile.js';
import Admin from '../models/Admin.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({});
    }
    successResponse(res, profile);
  } catch (error) { next(error); }
};

export const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);
      await profile.save();
    }
    successResponse(res, profile, 'Profile updated');
  } catch (error) { next(error); }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return errorResponse(res, 'Current and new password required', 400);
    }
    const admin = await Admin.findById(req.admin._id);
    if (!(await admin.comparePassword(currentPassword))) {
      return errorResponse(res, 'Current password is incorrect', 401);
    }
    admin.password = newPassword;
    await admin.save();
    successResponse(res, null, 'Password changed successfully');
  } catch (error) { next(error); }
};
