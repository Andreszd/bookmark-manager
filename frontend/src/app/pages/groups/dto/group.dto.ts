import { OutputApi } from 'src/app/types';

type GroupDto = {
  _id: string;
  name: string;
};

export interface ICreateGroupDto {
  name: string;
  urlIds?: string[];
}

export interface IAddPageToGroupDto {
  urlIds: string[];
}

export type OGetAllGroupDto = OutputApi<GroupDto[]>;

export type OCreateGroupDto = OutputApi<GroupDto>;

export type OAddUrlGroupDto = OutputApi<GroupDto>;
