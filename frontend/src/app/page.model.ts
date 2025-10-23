export type PageGroup = {
  id: number;
  name: string;
  pages: Page[];
};

export type Group = {
  id: string | number;
  name?: string;
  lastUpdated?: Date;
};

export type Page = {
  id: string | number;
  title: string;
  imgUrl: string;
  url: string;
  group?: Group;
};
