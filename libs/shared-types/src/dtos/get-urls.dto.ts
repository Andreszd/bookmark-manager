import { OutputAPI } from '../common';
import { Url } from '../models/url';

export type OgetUrlsDto = OutputAPI<{
  total: number;
  urls: Url<string>[];
}>;
