import { ObjectId } from 'mongodb';
import { Database } from '../db/database';
import { DBError } from '../errors/db-error';
import { Group } from '../models/group.model';

const create = async (group: any): Promise<string | undefined> => {
  try {
    const collection = await Database.operations?.collection('group');
    const record = await collection?.insertOne(group);
    return record?.insertedId.toString();
  } catch (error) {
    throw new DBError();
  }
};

const getById = async (id: string) => {
  try {
    const collection = await Database.operations?.collection('group');

    const group = await collection?.findOne({ _id: new ObjectId(id) });

    if (group) {
      return group as Group;
    }
  } catch (error) {
    throw new DBError();
  }
};

export const GroupsRepository = {
  create,
  getById,
};
