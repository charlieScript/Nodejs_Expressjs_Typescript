import { RequestHandler } from 'express';
import { loginController, signupController } from '../controllers/user.controller';
import logger from '../utils/logger';


export const signup: RequestHandler = async (req, res) => {
  try {
    const { name, password } = req.body;
    const { success, error, status, data, message } = await signupController(name, password);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    logger.error(error);
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { name, password } = req.body;
    const { success, error, status, data, message } = await loginController(name, password);
    if (!success) {
      return res.status(status).json({ success, error });
    }
    return res.status(status).json({ success, data, message });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      error: 'Internal server error',
    });
  }
};