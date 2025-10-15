import { User } from '../../models/user.model';

export type OutputGetUserDto = Omit<User, 'password' | 'createdAt'>;

export const getOutputGetUserDto = (data: User) => {
  return {
    _id: data._id,
    email: data.email,
  };
};
