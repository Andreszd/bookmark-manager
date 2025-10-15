import { writeFileSync } from 'fs';

const save = (base64: string, fileName: string, path: string = 'public/thumbnails') => {
  const bitMap = Buffer.from(base64, 'base64');

  writeFileSync(`${__dirname}/../../${path}/${fileName}`, bitMap);

  return fileName;
};

export const ImgService = {
  save,
};
