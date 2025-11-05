import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

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

const checkStatus = async (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_KEY ?? '', (err, data) => {
      if (err) {
        resolve({ valid: false, message: 'Token isnt valid' });
      }
      resolve({ valid: true, message: 'Token is valid' });
    });
  });
};

export const AuthService = { auth, checkStatus };
