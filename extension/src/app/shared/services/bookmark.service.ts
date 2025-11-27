import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { Group, OgetUrlsDto, Url } from 'libs/shared-types';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookmarkService {
  http = inject(HttpClient);
  loading = false;
  isSaved = false;

  groups: Group[] = [];

  results: Url<string>[] = [];

  urlsByGroup = new Map<string, Url<string>[]>();

  ngZone = inject(NgZone);

  saveCurrentPage() {
    this.loading = true;
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      this.ngZone.run(() => {
        if (tab.url && tab.title) {
          this.http.post('url', { url: tab.url }).subscribe(() => {
            this.loading = false;
            this.isSaved = true;

            window.setTimeout(() => {
              this.isSaved = false;
            }, 2000);
          });
        }
      });
    });
  }

  getAll(queries: { groupId?: string; search?: string; page?: number } = {}) {
    this.loading = true;
    return this.http
      .get<OgetUrlsDto>('url', {
        params: {
          ...(queries.page && { page: queries.page }),
          ...(queries.groupId && { groupId: queries.groupId }),
          ...(queries.search && {
            search: queries.search,
            searchInGroups: !queries.groupId,
          }),
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
          this.loading = false;
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
