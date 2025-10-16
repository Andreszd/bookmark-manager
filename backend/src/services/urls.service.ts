import { Url } from '../models/url.model';
import { UrlsRepository } from '../repositories/urls.repository';
import { OmitGenData } from '../types';
import { ImgService } from './imgs.service';
import { ScrapperService } from './scrapper.service';

const create = async (url: OmitGenData<Url>) => {
  try {
    const fileName = `thumbnail-${new Date().getTime()}.png`;

    let file, thumbnailUrl;

    file = await ScrapperService.captureFaviconFromUrl(url?.url);

    if (!file) {
      file = await ScrapperService.takeSnapshootByUrl(url?.url);
    }

    if (file) {
      thumbnailUrl = await ImgService.save(file, fileName);
    }

    await UrlsRepository.create({
      ...url,
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
const update = async (urlId: string, body: object) => {
  try {
    await UrlsRepository.update(urlId, body);
  } catch (error) {
    throw error;
  }
};
const remove = async (urlId: string) => {
  await UrlsRepository.update(urlId, {
    removed: true,
  });
};

export const UrlsService = { create, getById, getAll, update, remove };
