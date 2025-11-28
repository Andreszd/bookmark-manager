import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { Group, OgetUrlsDto, Url } from 'libs/shared-types';
import { BehaviorSubject, finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookmarkService {
  http = inject(HttpClient);
  private loading = new BehaviorSubject<'create' | 'get' | undefined>(
    undefined
  );
  loading$ = this.loading.asObservable();

  isSaved = false;

  groups: Group[] = [];

  results: Url<string>[] = [];

  urlsByGroup = new Map<string, Url<string>[]>();

  ngZone = inject(NgZone);

  save(tab: { url: string; title?: string }, groupId: string) {
    this.loading.next('create');
    return this.http
      .post(
        'url',
        { url: tab.url },
        {
          params: {
            ...(groupId && { groupId }),
          },
        }
      )
      .pipe(
        finalize(() => {
          this.loading.next(undefined);
        })
      );
  }

  getAll(queries: { groupId?: string; search?: string; page?: number } = {}) {
    this.loading.next('get');
    return this.http
      .get<OgetUrlsDto>('url', {
        params: {
          ...(queries.page && { page: queries.page }),
          ...(queries.groupId && { groupId: queries.groupId }),
          ...(queries.search && {
            search: queries.search,
            searchInGroups: !queries.groupId,
          }),
          sortCreatedAt: 'desc',
          size: 10,
        },
      })
      .pipe(
        map((value) => value?.data),
        map((value) => {
          return value.urls.map((item) => ({
            ...item,
            thumbnailUrl: item?.thumbnailUrl
              ? `${environment.imgsBucketUrl}/${item?.thumbnailUrl}`
              : undefined,
          }));
        }),
        finalize(() => {
          this.loading.next(undefined);
        })
      );
  }

  getGroups() {
    this.http.get<{ data: Group[] }>('group').subscribe((value) => {
      this.groups = value.data;
    });
  }

  open() {
    chrome.tabs.create({ url: 'http://localhost:4200/' });
  }
}
