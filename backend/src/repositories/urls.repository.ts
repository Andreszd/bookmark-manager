import { ObjectId } from "mongodb";
import { Database } from "../db/database";

const create = async (url: any) => {
  try {
    const collection = await Database.operations?.collection("url");
    await collection?.insertOne(url);
  } catch (error) {
    throw error;
  }
};

const getById = async (urlId: string) => {
  try {
    const collection = await Database.operations?.collection("url");
    const url = await collection?.findOne({
      _id: new ObjectId(urlId),
    });
    if (!url) throw "Url not found";

    return url;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const collection = await Database.operations?.collection("url");
    const urls = await collection
      ?.find({
        removed: {
          $exists: false,
        },
      })
      .toArray();

    return urls;
  } catch (error) {
    throw error;
  }
};

const update = async (urlId: string, updates: object) => {
  try {
    const collection = await Database.operations?.collection("url");
    await collection?.updateOne(
      {
        _id: new ObjectId(urlId),
      },
      {
        $set: updates,
      }
    );
  } catch (error) {
    throw error;
  }
};

export const UrlsRepository = {
  getById,
  getAll,
  create,
  update,
};
