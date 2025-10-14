import { ObjectId } from 'mongodb';
import { Database } from '../db/database';
import { DBError } from '../errors/db-error';

const create = async (url: any) => {
  try {
    const collection = await Database.operations?.collection('url');
    await collection?.insertOne(url);
  } catch (error) {
    throw new DBError();
  }
};

const getById = async (urlId: string) => {
  try {
    const collection = await Database.operations?.collection('url');
    const url = await collection?.findOne({
      _id: new ObjectId(urlId),
    });
    if (!url) throw 'Url not found';

    return url;
  } catch (error) {
    throw new DBError();
  }
};

const getAll = async (
  queries: {
    groupId?: string;
    size: number;
    sortCreatedAt?: 'asc' | 'desc';
  } = { size: 50, sortCreatedAt: 'desc' }
) => {
  try {
    const collection = await Database.operations?.collection('url');
    const urls = await collection
      ?.find({
        removed: {
          $exists: false,
        },
        groupId: queries.groupId ?? { $exists: false },
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

export const UrlsRepository = {
  getById,
  getAll,
  create,
  update,
};
