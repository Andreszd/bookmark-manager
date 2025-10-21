import { NextFunction, Request, Response } from 'express';
import { InputCreateUserDto } from '../dtos/create-group/input-create-user.dto';
import { UserService } from '../services/user.service';
import { getOutputGetUserDto } from '../dtos/get-user/output-get-user.dto';
import { AuthRequest } from '../types';

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const user = await UserService.getById(id);
    const data = user ? getOutputGetUserDto(user) : user;

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body as InputCreateUserDto;
    const result = await UserService.create(user);

    res.status(200).json({ message: 'user created', data: result });
  } catch (error) {
    next(error);
  }
};

const getSession = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user as string;
    const user = await UserService.getById(userId);
    const data = user ? getOutputGetUserDto(user) : user;

    res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
};

export const UserController = { getById, create, getSession };
