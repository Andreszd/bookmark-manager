import { NextFunction, Request, Response } from 'express';
import { UrlsService } from '../services/urls.service';
import { AuthRequest } from '../types';

const create = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    const groupId = req.query.groupId ? String(req.query.groupId) : undefined;

    await UrlsService.create({ ...req.body, userId, groupId });
    res.status(200).json({
      message: 'created',
    });
  } catch (error) {
    res.status(500).json({
      message: 'server internal error',
    });
  }
};

const getById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user as string;
    const url = await UrlsService.getById(req.params.id, userId);
    res.status(200).json(url);
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

const getAll = async (req: AuthRequest, res: Response) => {
  try {
    const { groupId, size = 50, sortCreatedAt, sortName, removed, search } = req.query;
    const userId = req.user as string;

    const urls = await UrlsService.getAll({
      userId,
      groupId: groupId ? String(groupId) : undefined,
      size: parseInt(String(size)),
      sortCreatedAt: sortCreatedAt === 'desc' ? 'desc' : 'asc',
      sortName: sortName ? (sortName === 'desc' ? 'desc' : 'asc') : undefined,
      removed: removed === 'true' ? true : undefined,
      search: search as string,
    });

    res.status(200).json({
      data: urls,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

const update = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user as string;
    const url = await UrlsService.update(req.params.id, req.body, userId);
    res.status(200).json({
      message: 'updated Url',
      data: url,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UrlsService.remove(req.params.id);
    res.status(200).json({
      message: 'removed Url',
    });
  } catch (error) {
    console.log(error, 0.1);
    next(error);
  }
};

const removeMultiple = async (req: Request, res: Response) => {
  console.log(12321321);
  try {
    const ids = req.body.ids as string[];

    await UrlsService.removeMultiple(ids);

    res.status(200).json({
      message: 'removed Urls',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: error,
    });
  }
};

export const UrlsController = { create, getById, getAll, update, remove, removeMultiple };
