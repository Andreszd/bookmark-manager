import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type OmitId<T> = Omit<T, '_id'>;

export type OmitGenData<T> = Omit<T, '_id' | 'createdAt'>;

export type OmitIds<T> = Omit<T, '_id' | 'userId' | 'groupId'>;

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}
