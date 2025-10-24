import { ObjectId } from 'mongodb';
import { Database } from '../db/database';
import { DBError } from '../errors/db-error';
import { Group } from '../models/group.model';
import { OmitId } from '../types';
import { NoReadAuthorizationError } from '../errors/no-read-authorization.error';
import { NoWriteAuthorizationError } from '../errors/no-write-authorization.error';

const create = async (group: OmitId<Group>): Promise<string | undefined> => {
  try {
    const collection = await Database.operations?.collection('group');
    const record = await collection?.insertOne(group);
    return record?.insertedId.toString();
  } catch (error) {
    throw new DBError();
  }
};

const getById = async (id: string, userId: string) => {
  try {
    const collection = await Database.operations?.collection<Group>('group');

    const group = await collection?.findOne({ _id: new ObjectId(id) });

    if (group?.userId !== userId) throw new NoReadAuthorizationError();

    if (group) {
      return group as Group;
    }
  } catch (error) {
    throw new DBError();
  }
};

const update = async (
  id: string,
  userId: string,
  body: { name: string } | { removed: boolean }
) => {
  try {
    const collection = await Database.operations?.collection<Group>('group');

    const group = await collection?.findOne({ _id: new ObjectId(id) });

    if (group?.userId !== userId) throw new NoWriteAuthorizationError();

    return await collection?.updateOne({ _id: new ObjectId(id) }, { $set: body });
  } catch (error) {
    throw new DBError();
  }
};

const getAll = async (query: { userId: string }) => {
  try {
    const collection = await Database.operations?.collection<Group>('group');

    const groups = await collection
      ?.find({
        userId: new ObjectId(query.userId),
        removed: {
          $exists: false,
        },
      })
      .toArray();

    return groups;
  } catch (error) {
    throw new DBError();
  }
};

const massiveRemove = async (ids: string[]) => {
  try {
    const collection = await Database.operations?.collection<Group>('group');

    await collection?.updateMany(
      { _id: { $in: ids.map((id) => new ObjectId(id)) } },
      { $set: { removed: true } }
    );
  } catch (error) {
    throw new DBError();
  }
};

export const GroupsRepository = {
  create,
  update,
  getById,
  getAll,
  massiveRemove,
};
