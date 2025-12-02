import { User } from '../../models/user.model';
import { OmitId } from '../../types';

export type InputAuthDto = {
  email: string;
  password: string;
};
