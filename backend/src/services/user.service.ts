import bcrypt from 'bcryptjs';
import { InputCreateUserDto } from '../dtos/create-group/input-create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import { EmailRepeatedError } from '../errors/email-repeated.error';

const create = async (user: InputCreateUserDto) => {
  try {
    const userWithSameEmail = await UserRepository.getBy('email', user.email);

    if (userWithSameEmail) throw new EmailRepeatedError();

    let passEnc;

    if (user.password) {
      passEnc = await bcrypt.hash(user.password, 10);
    }

    return await UserRepository.create({
      email: user.email,
      ...(passEnc && { password: passEnc }),
      createdAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

const getByEmail = async (email: string) => {
  const user = await UserRepository.getBy('email', email);
  return user;
};

const getById = async (id: string) => {
  try {
    return await UserRepository.getById(id);
  } catch (error) {
    throw error;
  }
};

export const UserService = { create, getById, getByEmail };
