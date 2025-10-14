import { writeFileSync } from "fs";
import puppeteer from "puppeteer";

const save = (
  base64: string,
  fileName: string,
  path: string = "public/thumbnails"
) => {
  const bitMap = Buffer.from(base64, "base64");

  writeFileSync(`${__dirname}/../../${path}/${fileName}`, bitMap);

  return fileName;
};

const captureWebFromUrl = async (
  url: string,
  fileName: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    puppeteer.launch().then(async (browser) => {
      try {
        const page = await browser.newPage();
        await page.goto(url);
        const fileBase64 = await page.screenshot({
          path: fileName,
          optimizeForSpeed: true,
          encoding: "base64",
        });
        await page.close();
        resolve(fileBase64);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const ImgService = {
  save,
  captureWebFromUrl,
};
