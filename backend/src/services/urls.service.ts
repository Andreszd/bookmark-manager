import { UrlsRepository } from "../repositories/urls.repository";
import { ImgService } from "./imgs.service";

const create = async (url: any) => {
  try {
    const fileName = `thumbnail-${new Date().getTime()}.png`;

    const file = await ImgService.captureWebFromUrl(url?.url, fileName);

    const thumbnailUrl = await ImgService.save(file, fileName);

    await UrlsRepository.create({
      ...url,
      thumbnailUrl,
      createdAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};
const getById = async (urlId: string) => {
  try {
    const url = await UrlsRepository.getById(urlId);
    return url;
  } catch (error) {
    throw error;
  }
};
const getAll = async () => {
  try {
    const urls = await UrlsRepository.getAll();
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
