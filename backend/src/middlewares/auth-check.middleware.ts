import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { NoAuthorizationError } from '../errors/no-authorization';
import { AuthRequest } from '../types';

export const checkAuthentication = (req: AuthRequest, res: Response, next: NextFunction) => {
  const [_, token] = req.headers['authorization']?.split(' ') ?? [];

  if (!token) next(new NoAuthorizationError());

  jwt.verify(token, process.env.JWT_KEY ?? '', (err, data) => {
    if (err) next(new NoAuthorizationError());

    req.user = data;
    next();
  });
};
