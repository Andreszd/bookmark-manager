import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ICreatePageDto,
  IUpdatePageDto,
  OGetAllPageDto,
  PageDto,
} from '../dto/page.dto';
import { OutputApi } from 'src/app/types';

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

  update(id: string, body: IUpdatePageDto) {
    return this.http.patch<OutputApi<PageDto>>(`url/${id}`, body);
  }

  delete(id: string) {
    return this.http.delete(`url/${id}`);
  }

  deleteMultiple(ids: string[]) {
    return this.http.delete(`url/multiple`, { body: { ids } });
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
