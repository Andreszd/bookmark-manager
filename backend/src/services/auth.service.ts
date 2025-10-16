import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const auth = async ({ email, password }: { email: string; password: string }) => {
  try {
    const user = await UserRepository.getBy('email', email);

    if (!user) throw { message: 'User not registered' };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw { message: 'Incorrect password' };

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as string, {
      expiresIn: '1h',
    });

    return token;
  } catch (error) {
    throw error;
  }
};

export const AuthService = { auth };
