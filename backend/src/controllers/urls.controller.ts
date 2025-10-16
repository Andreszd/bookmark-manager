import { Request, Response } from 'express';
import { UrlsService } from '../services/urls.service';
import { AuthRequest } from '../types';

const create = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user;
    await UrlsService.create({ ...req.body, userId });
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
    const { groupId, size = 50, sortCreatedAt } = req.query;
    const userId = req.user as string;

    const urls = await UrlsService.getAll({
      userId,
      groupId: groupId ? String(groupId) : undefined,
      size: parseInt(String(size)),
      sortCreatedAt: sortCreatedAt === 'desc' ? 'desc' : 'asc',
    });

    res.status(200).json({
      urls,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    await UrlsService.update(req.params.id, req.body);
    res.status(200).json({
      message: 'updated Url',
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    await UrlsService.remove(req.params.id);
    res.status(200).json({
      message: 'removed Url',
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

export const UrlsController = { create, getById, getAll, update, remove };
