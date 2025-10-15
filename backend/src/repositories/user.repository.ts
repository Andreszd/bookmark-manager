import { ObjectId } from 'mongodb';
import { Database } from '../db/database';
import { DBError } from '../errors/db-error';
import { User } from '../models/user.model';
import { OmitId } from '../types';

const create = async (user: OmitId<User>) => {
  try {
    const collection = await Database.operations?.collection('user');
    const result = await collection?.insertOne(user);
    if (result?.insertedId) {
      return { _id: result?.insertedId, ...user };
    }
  } catch (error) {
    throw new DBError();
  }
};

const getById = async (id: string) => {
  try {
    const collection = await Database.operations?.collection<User>('user');
    const user = collection?.findOne({ _id: new ObjectId(id) });
    return user;
  } catch (error) {
    throw new DBError();
  }
};

const getBy = async (attr: string, value: string) => {
  try {
    const collection = await Database.operations?.collection<User>('user');
    const user = collection?.findOne({ [attr]: value });
    return user;
  } catch (error) {
    throw new DBError();
  }
};

export const UserRepository = { create, getById, getBy };
