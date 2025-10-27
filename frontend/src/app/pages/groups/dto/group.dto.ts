import { OutputApi } from 'src/app/types';

type GroupDto = {
  _id: string;
  name: string;
};

export interface ICreateGroupDto {
  name: string;
}

export interface IAddPageToGroupDto {
  pageIds: string[];
}

export type OGetAllGroupDto = OutputApi<GroupDto[]>;

export type OCreateGroupDto = OutputApi<GroupDto>;

export type OAddUrlGroupDto = OutputApi<GroupDto>;
