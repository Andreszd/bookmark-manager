import { ObjectId } from 'mongodb';
import { Database } from '../db/database';
import { DBError } from '../errors/db-error';
import { Url } from '../models/url.model';
import { OmitGenData, OmitId } from '../types';
import { NoReadAuthorizationError } from '../errors/no-read-authorization.error';
import { cleanObject } from '../utils/cleanObjects';

const create = async (url: OmitId<Url>) => {
  try {
    const collection = await Database.operations?.collection('url');

    let body = {
      ...url,
      userId: url.userId ? new ObjectId(url.userId) : undefined,
      ...(url.groupId && { groupId: new ObjectId(url.groupId) }),
    };

    await collection?.insertOne(cleanObject(body));
  } catch (error) {
    throw new DBError();
  }
};

const getById = async (urlId: string, userId: string) => {
  try {
    const collection = await Database.operations?.collection<Url>('url');
    const url = await collection?.findOne({
      _id: new ObjectId(urlId),
    });
    if (url?.userId.toString() !== userId) throw new NoReadAuthorizationError();

    if (!url) throw 'Url not found';

    return url;
  } catch (error) {
    throw new DBError();
  }
};

const getAll = async (queries: {
  userId: string;
  search?: string;
  groupId?: string;
  size: number;
  sortCreatedAt?: 'asc' | 'desc';
  sortName?: 'asc' | 'desc';
  removed?: boolean;
}) => {
  try {
    const collection = await Database.operations?.collection('url');

    const urls = await collection
      ?.find({
        removed: queries.removed ?? {
          $exists: false,
        },
        ...(queries.search && { name: { $regex: queries.search, $options: 'i' } }),
        userId: new ObjectId(queries.userId),
        ...(!queries.removed && {
          groupId: queries.groupId ? new ObjectId(queries.groupId) : { $exists: false },
        }),
      })
      .sort({
        ...(queries.sortName && { name: queries.sortName === 'asc' ? 1 : -1 }),
        createdAt: queries.sortCreatedAt === 'asc' ? 1 : -1,
      })
      .limit(queries.size)
      .toArray();

    return urls;
  } catch (error) {
    throw new DBError();
  }
};

const update = async (urlId: string, updates: Partial<Url>) => {
  try {
    const collection = await Database.operations?.collection<Url>('url');
    const res = await collection?.findOneAndUpdate(
      {
        _id: new ObjectId(urlId),
      },
      {
        $set: updates,
      },
      {
        returnDocument: 'after',
      }
    );
    return res;
  } catch (error) {
    throw new DBError();
  }
};

const updateManyByGroupId = async (
  groupIds: string[],
  values: Partial<OmitGenData<OmitId<Url>>>
) => {
  try {
    const collection = await Database.operations?.collection('url');
    await collection?.updateMany(
      {
        groupId: { $in: groupIds.map((id) => new ObjectId(id)) },
      },
      {
        $set: {
          ...values,
          groupId: values.groupId ? new ObjectId(values.groupId) : undefined,
        },
      }
    );
  } catch (error) {
    throw new DBError();
  }
};

const updateManyById = async (ids: string[], values: Partial<OmitGenData<OmitId<Url>>>) => {
  try {
    const collection = await Database.operations?.collection('url');

    const formatted = {
      ...values,
    };

    if ('groupId' in formatted) {
      formatted.groupId = new ObjectId(values.groupId as string);
    }

    const res = await collection?.updateMany(
      {
        _id: { $in: ids.map((id) => new ObjectId(id)) },
      },
      {
        $set: {
          ...formatted,
        },
      }
    );
    return res;
  } catch (error) {
    throw new DBError();
  }
};

export const UrlsRepository = {
  getById,
  getAll,
  create,
  update,
  updateManyByGroupId,
  updateManyById,
};
