import { UserRepository } from '../repositories/user.repository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuthService } from './oaut.service';
import { ObjectId } from 'mongodb';
import { UserService } from './user.service';

const genToken = (userId: ObjectId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_KEY as string, {
    expiresIn: '1h',
  });
};

const auth = async ({ email, password }: { email: string; password: string }) => {
  try {
    const user = await UserRepository.getBy('email', email);

    if (!user) throw { message: 'User not registered' };

    if (user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) throw { message: 'Incorrect password' };
    }

    const token = genToken(user._id);

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

const authGoogle = async (code: string) => {
  try {
    let userId;

    const data = await OAuthService.auth(code);

    const user = await UserService.getByEmail(data.email);

    if (!user) {
      const user = await UserService.create({ email: data.email });
      userId = user?._id;
    } else {
      userId = user._id;
    }

    if (!userId) throw new Error('Authentication error');

    return genToken(userId);
  } catch (error) {
    throw error;
  }
};

export const AuthService = { auth, authGoogle, checkStatus };
