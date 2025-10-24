import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreatePageDto, OGetAllPageDto } from '../dto/page.dto';

@Injectable({
  providedIn: 'root',
})
export class PageApiService {
  http = inject(HttpClient);

  constructor() {}

  create(body: ICreatePageDto, groupId?: string) {
    return this.http.post('url', body, {
      params: {
        ...(groupId && { groupId }),
      },
    });
  }

  update() {}

  getAll<T>(queries?: { groupId?: string }) {
    return this.http.get<OGetAllPageDto<T>>(`url`, {
      params: {
        ...(queries?.groupId && { groupId: queries.groupId }),
      },
    });
  }
}
