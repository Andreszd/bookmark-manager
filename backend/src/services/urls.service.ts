import { Url } from '../models/url.model';
import { UrlsRepository } from '../repositories/urls.repository';
import { OmitGenData } from '../types';
import { ImgService } from './imgs.service';
import { ScrapperService } from './scrapper.service';

const getMetadata = async (url: string) => {
  const fileName = `thumbnail-${new Date().getTime()}.png`;
  let thumbnailUrl;

  let { name, url: urlBase64 } = await ScrapperService.captureTitleAndFaviconFromUrl(url);

  if (!urlBase64) {
    urlBase64 = await ScrapperService.takeSnapshootByUrl(url);
  }

  if (urlBase64) {
    thumbnailUrl = await ImgService.save(urlBase64, fileName);
  }

  return {
    thumbnailUrl,
    name,
  };
};

const create = async (url: OmitGenData<Url>) => {
  try {
    const { name, thumbnailUrl } = await getMetadata(url.url);

    await UrlsRepository.create({
      ...url,
      name,
      thumbnailUrl,
      createdAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};
const getById = async (urlId: string, userId: string) => {
  try {
    const url = await UrlsRepository.getById(urlId, userId);
    return url;
  } catch (error) {
    throw error;
  }
};
const getAll = async (queries: Parameters<typeof UrlsRepository.getAll>[0]) => {
  try {
    const urls = await UrlsRepository.getAll(queries);
    return urls;
  } catch (error) {
    throw error;
  }
};
const update = async (urlId: string, body: Partial<Url>, userId: string) => {
  try {
    const url = await UrlsRepository.getById(urlId, userId);

    let genData = {};

    if (body.url && url.url !== body.url) {
      genData = await getMetadata(body.url);
    }
    const res = await UrlsRepository.update(urlId, { ...body, ...genData });
    return res;
  } catch (error) {
    throw error;
  }
};
const remove = async (urlId: string) => {
  try {
    await UrlsRepository.update(urlId, {
      removed: true,
    });
  } catch (error) {
    throw error;
  }
};
const removeMultiple = async (urlIds: string[]) => {
  try {
    await UrlsRepository.updateManyById(urlIds, {
      removed: true,
    });
  } catch (error) {
    throw error;
  }
};

export const UrlsService = { create, getById, getAll, update, remove, removeMultiple };
