import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NoAuthorizationError } from '../errors/no-authorization';

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const checkAuthentication = (req: AuthRequest, res: Response, next: NextFunction) => {
  const [_, token] = req.headers['authorization']?.split(' ') ?? [];

  if (!token) next(new NoAuthorizationError());

  jwt.verify(token, process.env.JWT_KEY ?? '', (err, data) => {
    if (err) next(new NoAuthorizationError());

    req.user = data;
    next();
  });
};
