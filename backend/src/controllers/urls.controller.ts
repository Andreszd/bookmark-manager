import { NextFunction, Request, Response } from 'express';
import { UrlsService } from '../services/urls.service';
import { AuthRequest } from '../types';

const create = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user;
    const groupId = req.query.groupId ? String(req.query.groupId) : undefined;

    await UrlsService.create({ ...req.body, userId, groupId });
    res.status(200).json({
      message: 'created',
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user as string;
    const url = await UrlsService.getById(req.params.id, userId);
    res.status(200).json(url);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const {
      groupId,
      size = 50,
      sortCreatedAt,
      sortName,
      removed,
      search,
      page,
      searchInGroups,
    } = req.query;
    const userId = req.user as string;

    const urls = await UrlsService.getAll({
      userId,
      groupId: groupId ? String(groupId) : undefined,
      size: parseInt(String(size)),
      page: parseInt(String(page)) || 1,
      sortCreatedAt: sortCreatedAt === 'desc' ? 'desc' : 'asc',
      sortName: sortName ? (sortName === 'desc' ? 'desc' : 'asc') : undefined,
      removed: removed === 'true' ? true : undefined,
      search: search as string,
      searchInGroups: searchInGroups === 'true',
    });

    res.status(200).json({
      data: urls,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user as string;
    const url = await UrlsService.update(req.params.id, req.body, userId);
    res.status(200).json({
      message: 'updated Url',
      data: url,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UrlsService.remove(req.params.id);
    res.status(200).json({
      message: 'removed Url',
    });
  } catch (error) {
    next(error);
  }
};

const removeMultiple = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ids = req.body.ids as string[];

    await UrlsService.removeMultiple(ids);

    res.status(200).json({
      message: 'removed Urls',
    });
  } catch (error) {
    next(error);
  }
};

export const UrlsController = { create, getById, getAll, update, remove, removeMultiple };
