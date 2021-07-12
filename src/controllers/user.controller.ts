import joi from 'joi';
import { signPayload } from '../helpers/jwt';
import { createUser, findUser} from '../services/user.service'

// Interface for expected response
interface IHelperResponse {
  success: boolean;
  status: number;
  data?: { token: string; };
  error?: string;
  message?: string;
}

export const signupController = async (name: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().min(5),
  });

  const validationResult = validationSchema.validate({ name, password})
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  // check for existing user
  const existingUser = await findUser(name);
  if (existingUser) {
    return {
      success: false,
      status: 400,
      error: 'Invalid username and/or password.',
    };
  }
  const user = await createUser(name, password);
  return {
    success: true,
    status: 200,
    message: 'Account successfully created',
    data: { token: signPayload({ id: user.id }) },
  };
}


export const loginController = async (name: string, password: string): Promise<IHelperResponse> => {
  const validationSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().min(5),
  });

  const validationResult = validationSchema.validate({ name, password });
  if (validationResult.error) {
    return {
      success: false,
      status: 400,
      error: validationResult.error.message,
    };
  }

  const user = await findUser(name);
  if (!user) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return { success: false, status: 401, error: 'Incorrect username and/or password.' };
  }

  return {
    success: true,
    status: 200,
    message: 'Login successful',
    data: { token: signPayload({ id: user.id }) },
  }
}