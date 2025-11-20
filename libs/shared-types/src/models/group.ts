export type Group<Id = string> = {
  _id: Id;
  name: string;
  userId: Id;
  createdAt: Date;
};
