import { InputCreateGroupDto } from '../dtos/create-group/input-create-group.dto';
import { IUpdateGroupDto } from '../dtos/group/i-update-group.dto';
import { GroupsRepository } from '../repositories/groups.repository';
import { UrlsRepository } from '../repositories/urls.repository';

const create = async (userId: string, group: InputCreateGroupDto, urlIds?: string[]) => {
  try {
    const groupId = await GroupsRepository.create({
      userId,
      name: group.name,
      createdAt: new Date(),
    });

    if (urlIds?.length) {
      await UrlsRepository.updateManyById(urlIds, {
        groupId,
      });
    }
    return groupId;
  } catch (error) {
    throw error;
  }
};

const getById = async (id: string, userId: string) => {
  try {
    const group = await GroupsRepository.getById(id, userId);
    return group;
  } catch (error) {
    throw error;
  }
};

const update = async (id: string, userId: string, body: IUpdateGroupDto) => {
  try {
    const group = await GroupsRepository.update(id, userId, body);
    return group;
  } catch (error) {
    throw error;
  }
};

const getAll = async (query: Parameters<typeof GroupsRepository.getAll>[0]) => {
  try {
    const groups = await GroupsRepository.getAll(query);
    return groups;
  } catch (error) {
    throw error;
  }
};

const remove = async (id: string, userId: string) => {
  try {
    const group = await GroupsRepository.update(id, userId, { removed: true });
    return group;
  } catch (error) {
    throw error;
  }
};

const merge = async (groupIds: string[] = []) => {
  try {
    if (groupIds.length > 1) {
      const [baseId, ...ids] = groupIds ?? [];

      await UrlsRepository.updateManyByGroupId(ids, { groupId: baseId });
      await GroupsRepository.massiveRemove(ids);
    } else {
      throw { message: 'Missing  required data' };
    }
  } catch (error) {
    throw error;
  }
};

const addUrls = async (groupId: string, urlIds: string[] = []) => {
  try {
    if (!groupId || !urlIds.length) throw { message: 'Missing  required data' };

    await UrlsRepository.updateManyById(urlIds, { groupId });
  } catch (error) {
    throw error;
  }
};

export const GroupsService = { create, getById, update, getAll, remove, merge, addUrls };
