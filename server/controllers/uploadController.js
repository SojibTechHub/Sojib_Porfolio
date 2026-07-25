import cloudinary from '../utils/cloudinaryConfig.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, 'No file uploaded', 400);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/images',
      transformation: [{ quality: 'auto', fetch_format: 'auto' }],
    });
    successResponse(res, { url: result.secure_url, publicId: result.public_id }, 'Image uploaded');
  } catch (error) { next(error); }
};

export const uploadCV = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, 'No file uploaded', 400);
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/cv',
      resource_type: 'raw',
    });
    successResponse(res, { url: result.secure_url, publicId: result.public_id }, 'CV uploaded');
  } catch (error) { next(error); }
};
