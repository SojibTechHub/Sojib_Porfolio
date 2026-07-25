import Message from '../models/Message.js';
import { sendContactEmail } from '../utils/sendEmail.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message, budget } = req.body;
    if (!name || !email || !message) {
      return errorResponse(res, 'Name, email, and message are required', 400);
    }
    const msg = await Message.create({ name, email, subject, message, budget });
    try {
      await sendContactEmail({ name, email, subject, message, budget });
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr.message);
    }
    successResponse(res, msg, 'Message sent successfully', 201);
  } catch (error) { next(error); }
};
