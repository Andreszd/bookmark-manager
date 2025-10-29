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

  delete(id: string) {
    return this.http.delete(`url/${id}`);
  }

  getAll<T>(queries?: {
    groupId?: string;
    removed?: boolean;
    search?: string;
    sortCreatedAt?: 'asc' | 'desc' | undefined;
    sortName?: 'asc' | 'desc' | undefined;
  }) {
    return this.http.get<OGetAllPageDto<T>>(`url`, {
      params: {
        ...(queries?.search?.length && {
          search: queries.search,
        }),
        ...(queries?.groupId && {
          groupId: queries.groupId,
        }),
        ...(queries?.removed && {
          removed: queries.removed,
        }),
        ...(queries?.sortCreatedAt && {
          sortCreatedAt: queries.sortCreatedAt,
        }),
        ...(queries?.sortName && {
          sortName: queries.sortName,
        }),
      },
    });
  }
}
