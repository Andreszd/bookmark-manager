import { Group } from '../models/group.model';
import { GroupsRepository } from '../repositories/groups.repository';
import { UrlsRepository } from '../repositories/urls.repository';
import { OmitId } from '../types';

const create = async (group: OmitId<Group>, urlIds?: string[]) => {
  try {
    const groupId = await GroupsRepository.create(group);

    if (urlIds) {
      for (const id of urlIds) {
        await UrlsRepository.update(id, {
          groupId,
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

const getById = async (id: string) => {
  try {
    const group = await GroupsRepository.getById(id);
    if (group) {
      return group;
    }
  } catch (error) {
    throw error;
  }
};

export const GroupsService = { create, getById };
