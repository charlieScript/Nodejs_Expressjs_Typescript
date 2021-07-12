import User, { UserInterface } from '../model/user.model';

export const createUser = async (name: string, password: string): Promise<UserInterface> => {
  return User.create({ name, password });
};

export const findUser = async (name: string): Promise<UserInterface | null> => {
  return User.findOne({ name });
};
