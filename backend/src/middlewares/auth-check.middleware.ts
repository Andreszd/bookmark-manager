import { NextFunction, Response } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { NoAuthorizationError } from '../errors/no-authorization';
import { AuthRequest } from '../types';
import { SessionExpiredError } from '../errors/session-expired.error';

export const checkAuthentication = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization as string;

  if (!token) next(new NoAuthorizationError());

  jwt.verify(token, process.env.JWT_KEY ?? '', (err, data) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        next(new SessionExpiredError());
      }
      next(new NoAuthorizationError());
    }

    if (data && typeof data === 'object' && '_id' in data) {
      req.user = (data as jwt.JwtPayload)._id;
    } else {
      req.user = undefined;
    }
    next();
  });
};
