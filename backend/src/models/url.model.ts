import { ObjectId } from 'mongodb';

export type Url = {
  userId: string;
  url: string;
  name?: string;
  groupId: string | ObjectId;
  thumbnailUrl?: string;
  createdAt: Date;
  removed?: boolean;
};

export const jsonScheme = {
  title: 'Url object validation',
  required: [
    'url',
    //'name',
    'createdAt',
  ],
  properties: {
    url: {
      bsonType: 'string',
      description: 'Must be a string',
    },
    //name: {
    //bsonType: 'string',
    //description: 'Must be a string',
    //},
    createdAt: {
      bsonType: 'date',
      description: 'Must be a string',
    },
  },
};

export const UrlModel = {
  jsonScheme,
};
