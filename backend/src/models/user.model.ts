import { ObjectId } from 'mongodb';

export type User = {
  _id: ObjectId;
  email: string;
  password?: string;
  createdAt: Date;
};

export const jsonScheme = {
  title: 'User object validation',
  required: ['email', 'createdAt'],
  properties: {
    email: {
      bsonType: 'string',
      description: 'Must be a string',
    },
    createdAt: {
      bsonType: 'date',
      description: 'Must be a date',
    },
  },
};

export const UserModel = {
  jsonScheme,
};
