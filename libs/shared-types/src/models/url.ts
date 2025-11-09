export type Url<Id> = {
  userId: string;
  url: string;
  name?: string;
  groupId: string | Id;
  thumbnailUrl?: string;
  createdAt: Date;
  removed?: boolean;
};
