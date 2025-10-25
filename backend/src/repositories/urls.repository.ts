import { ObjectId } from 'mongodb';
import { Database } from '../db/database';
import { DBError } from '../errors/db-error';
import { Url } from '../models/url.model';
import { OmitGenData, OmitId } from '../types';
import { NoReadAuthorizationError } from '../errors/no-read-authorization.error';

const create = async (url: OmitId<Url>) => {
  try {
    const collection = await Database.operations?.collection('url');
    await collection?.insertOne({
      ...url,
      userId: url.userId ? new ObjectId(url.userId) : undefined,
      ...(url.groupId && { groupId: new ObjectId(url.groupId) }),
    });
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
    if (url?.userId !== userId) throw new NoReadAuthorizationError();

    if (!url) throw 'Url not found';

    return url;
  } catch (error) {
    throw new DBError();
  }
};

const getAll = async (queries: {
  userId: string;
  groupId?: string;
  size: number;
  sortCreatedAt?: 'asc' | 'desc';
  removed?: boolean;
}) => {
  try {
    const collection = await Database.operations?.collection('url');

    const urls = await collection
      ?.find({
        removed: queries.removed ?? {
          $exists: false,
        },
        userId: new ObjectId(queries.userId),
        ...(!queries.removed && {
          groupId: queries.groupId ? new ObjectId(queries.groupId) : { $exists: false },
        }),
      })
      .sort({
        createdAt: queries.sortCreatedAt === 'asc' ? 1 : -1,
      })
      .limit(queries.size)
      .toArray();

    return urls;
  } catch (error) {
    throw new DBError();
  }
};

const update = async (urlId: string, updates: object) => {
  try {
    const collection = await Database.operations?.collection('url');
    await collection?.updateOne(
      {
        _id: new ObjectId(urlId),
      },
      {
        $set: updates,
      }
    );
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
    const res = await collection?.updateMany(
      {
        _id: { $in: ids.map((id) => new ObjectId(id)) },
      },
      {
        $set: {
          ...values,
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
