import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { InputAuthDto } from '../dtos/auth/input-auth.dto';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as InputAuthDto;
    const token = await AuthService.auth(body);

    res.status(200).json({ message: 'successful authentication', data: { token } });
  } catch (error) {
    next(error);
  }
};

const authGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = req.body.code;

    const token = await AuthService.authGoogle(code);

    res.status(200).json({ message: ' successful authentication', data: { token } });
  } catch (error) {
    next(error);
  }
};

const status = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const data = await AuthService.checkStatus(token);

    res.status(200).json({ data });
  } catch (error) {}
};

export const AuthController = { auth, status, authGoogle };
