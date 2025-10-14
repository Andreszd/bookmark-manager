import { NextFunction, Request, Response } from 'express';

import { GroupsService } from '../services/groups.service';
import { InputCreateGroupDto } from '../dtos/create-group/input-create-group.dto';

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as InputCreateGroupDto;

    await GroupsService.create(
      {
        name: body.name,
        createdAt: new Date(),
      },
      body.urlIds
    );

    res.status(200).json({
      message: 'created',
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;

    const group = await GroupsService.getById(id);

    res.status(200).json({
      data: group,
    });
  } catch (error) {
    throw error
  }
};

const update = () => {};

const remove = () => {};

const getAll = () => {};

export const GroupsController = { create, getById, getAll, update, remove };
