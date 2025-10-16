import { NextFunction, Request, Response } from 'express';
import { DBError } from '../errors/db-error';
import { NoAuthorizationError } from '../errors/no-authorization';

export const errorsHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof DBError) {
    res.status(500).json({ message: error.message });
    return;
  }
  if (error instanceof NoAuthorizationError) {
    res.status(error.code).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: error.message ?? 'internal error' });
};
