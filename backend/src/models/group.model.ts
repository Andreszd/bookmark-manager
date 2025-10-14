import { ObjectId } from 'mongodb';

export type Group = {
  _id: ObjectId;
  name: string;
  createdAt: Date;
};

export const jsonScheme = {
  title: 'Group object validation',
  required: ['name', 'createdAt'],
  properties: {
    name: {
      bsonType: 'string',
      description: 'Must be a string',
    },
    createdAt: {
      bsonType: 'date',
      description: 'Must be a string',
    },
  },
};

export const GroupModel = {
  jsonScheme,
};
