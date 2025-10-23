import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreatePageDto, OGetAllPageDto } from '../dto/page.dto';

@Injectable({
  providedIn: 'root',
})
export class PageApiService {
  http = inject(HttpClient);

  constructor() {}

  create(body: ICreatePageDto) {
    return this.http.post('url', body);
  }

  update() {}

  getAll<T>() {
    return this.http.get<OGetAllPageDto<T>>('url');
  }
}
