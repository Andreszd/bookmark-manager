export type url = {
  url: string;
  name: string;
  createdAt: Date;
};

export const jsonScheme = {
  title: "Url object validation",
  required: ["url", "name", "createdAt"],
  properties: {
    url: {
      bsonType: "string",
      description: "Must be a string",
    },
    name: {
      bsonType: "string",
      description: "Must be a string",
    },
    createdAt: {
      bsonType: "date",
      description: "Must be a string",
    },
  },
};

export const UrlModel = {
  jsonScheme,
};
