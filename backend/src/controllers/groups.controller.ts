import { NextFunction, Response } from 'express';

import { GroupsService } from '../services/groups.service';
import { InputCreateGroupDto } from '../dtos/create-group/input-create-group.dto';
import { AuthRequest } from '../types';

const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body as InputCreateGroupDto;
    const userId = req.user as string;

    const groupId = await GroupsService.create(userId, body, body.urlIds);

    res.status(200).json({
      message: 'created',
      data: {
        _id: groupId,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const userId = req.user as string;

    const group = await GroupsService.getById(id, userId);

    res.status(200).json({
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const userId = req.user as string;
    const body = req.body;

    const group = await GroupsService.update(id, userId, body);

    res.status(200).json({
      message: 'group updated',
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user as string;

    const groups = await GroupsService.getAll({ userId });

    res.status(200).json({ data: groups });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user as string;
    const id = req.params.id;

    await GroupsService.remove(id, userId);

    res.status(200).json({ message: 'Group removed' });
  } catch (error) {
    next(error);
  }
};

const merge = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const body = req.body as { groupIds: string[] };

    await GroupsService.merge(body.groupIds);

    res.status(200).json({ message: 'Data merged' });
  } catch (error) {
    next(error);
  }
};

const addUrls = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const body = req.body as { urlIds: string[] };

    await GroupsService.addUrls(id, body.urlIds);

    res.status(200).json({ message: 'urls added' });
  } catch (error) {
    next(error);
  }
};

export const GroupsController = { create, getById, getAll, update, remove, merge, addUrls };
