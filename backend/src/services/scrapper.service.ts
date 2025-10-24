import puppeteer from 'puppeteer';

const takeSnapshootByUrl = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    puppeteer.launch().then(async (browser) => {
      try {
        const page = await browser.newPage();

        await page.goto(url);

        const fileBase64 = await page.screenshot({
          optimizeForSpeed: true,
          encoding: 'base64',
        });
        await page.close();
        resolve(fileBase64);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const getImgResourceByUrl = async (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    puppeteer.launch().then(async (browser) => {
      try {
        const page = await browser.newPage();

        const viewSource = await page.goto(url);
        const buffer = await viewSource?.buffer();

        await page.close();

        if (buffer) {
          resolve(buffer?.toString('base64'));
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

const captureTitleAndFaviconFromUrl = (
  url: string
): Promise<Partial<{ url: string; name: string }>> => {
  const baseUrl = new URL(url).origin;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        if (res.ok) {
          res
            .text()
            .then((res) => {
              //const regex = /(?<=rel\=\"icon\" href\=\")(.*?)(?=\")/g;
              const regexToCatchTitleTagContent = /<title\b[^>]*>([\s\S]*?)<\/title>/i;

              const match = res.match(regexToCatchTitleTagContent) ?? [];
              const title = match[1];

              const regex =
                /<link\b[^>]*\brel=["'](?:shortcut\s+icon|icon)["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi;

              const linkTags = res.match(regex) ?? [];

              const regexToCathUrl = /(?<=href=["'])(.*?)(?=["'])/g;

              const urls = linkTags.map((tag) => tag.match(regexToCathUrl)?.[0] ?? '');

              let URL;
              if (urls?.length) {
                const posiblesFaviconUrls = urls.filter((url) => url.includes('fav'));

                if (posiblesFaviconUrls.length) {
                  const faviconUrl = posiblesFaviconUrls[0];

                  const isRelativePath =
                    faviconUrl.startsWith('/') || !faviconUrl.startsWith('http');

                  const isUrl = faviconUrl.startsWith('http');

                  if (isRelativePath) {
                    URL = `${baseUrl}${!faviconUrl.startsWith('/') ? '/' : ''}${faviconUrl}`;
                  }
                  if (isUrl) {
                    URL = `${faviconUrl}`;
                  }
                  if (URL) {
                    getImgResourceByUrl(URL)
                      .then((url) => resolve({ url: url ?? '', name: title }))
                      .catch(reject);
                  } else {
                    resolve({ name: title });
                  }
                }
              } else {
                resolve({ name: title });
              }
            })
            .catch(reject);
        }
      })
      .catch(reject);
  });
};

export const ScrapperService = {
  takeSnapshootByUrl,
  captureTitleAndFaviconFromUrl,
};
