import bcrypt from 'bcryptjs';
import { InputCreateUserDto } from '../dtos/create-group/input-create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { EmailRepeatedError } from '../errors/email-repeated.error';

const create = async (user: InputCreateUserDto) => {
  try {
    const userWithSameEmail = await UserRepository.getBy('email', user.email);

    if (userWithSameEmail) throw new EmailRepeatedError();

    const password = await bcrypt.hash(user.password, 10);

    return await UserRepository.create({ email: user.email, password, createdAt: new Date() });
  } catch (error) {
    throw error;
  }
};

const getById = async (id: string) => {
  try {
    return await UserRepository.getById(id);
  } catch (error) {
    throw error;
  }
};

export const UserService = { create, getById };
