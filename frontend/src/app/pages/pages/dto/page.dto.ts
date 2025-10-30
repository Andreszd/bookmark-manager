export type PageDto = {
  _id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  createdAt: Date;
};

export interface OGetAllPageDto<D = PageDto[]> {
  message: string;
  data: D;
}

export interface ICreatePageDto {
  url: string;
}

export interface IUpdatePageDto {
  url?: string;
  name?: string;
}
