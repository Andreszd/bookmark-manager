import { Db, MongoClient } from 'mongodb';
import { UrlModel } from '../models/url.model';
import { GroupModel } from '../models/group.model';
import { UserModel } from '../models/user.model';

const CONNECTION_URI = 'mongodb://127.0.0.1:27017/bookmark';

export class Database {
  static connection?: MongoClient;
  static operations?: Db;

  constructor() {}

  async createCollections() {
    if (Database.operations) {
      const collections = await Database.operations.listCollections().toArray();
      const collectionsName = collections.map(({ name }) => name);

      if (!collectionsName.includes('user')) {
        Database.operations.createCollection('user', {
          validator: {
            $jsonSchema: UserModel.jsonScheme,
          },
        });
      }

      if (!collectionsName.includes('url')) {
        Database.operations
          .createCollection('url', {
            validator: {
              $jsonSchema: UrlModel.jsonScheme,
            },
          })
          .catch(() => {});
      }

      if (!collectionsName.includes('group')) {
        Database.operations
          .createCollection('group', {
            validator: {
              $jsonSchema: GroupModel.jsonScheme,
            },
          })
          .catch(() => {});
      }

      console.log('created collections');
    }
  }

  run() {
    if (!Database.connection) {
      const client = new MongoClient(CONNECTION_URI);
      client.connect().then((connection) => {
        Database.connection = connection;
        Database.operations = connection.db('bookmark-project');

        this.createCollections();
        console.log('database connected');
      });
    }
  }
}
