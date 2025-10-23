export type PageDto = {
  name: string;
  url: string;
};

export interface OGetAllPageDto<D = PageDto[]> {
  message: string;
  data: D;
}

export interface ICreatePageDto {
  url: string;
}
