import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { Group, OgetUrlsDto, Url } from 'libs/shared-types';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookmarkService {
  http = inject(HttpClient);
  loading = false;
  isSaved = false;

  urls: Url<string>[] = [];
  groups: Group[] = [];

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

  getAll(queries: { groupId?: string } = {}) {
    this.http
      .get<OgetUrlsDto>('url', {
        params: {
          ...(queries.groupId && { groupId: queries.groupId }),
        },
      })
      .pipe(map((value) => value?.data))
      .subscribe((value) => {
        const formatted = value.urls.map((item) => ({
          ...item,
          thumbnailUrl: item?.thumbnailUrl
            ? `${environment.imgsBucketUrl}/${item?.thumbnailUrl}`
            : undefined,
        }));

        if (queries.groupId) {
          this.urlsByGroup.set(queries.groupId, formatted);
          return;
        }
        this.urls = formatted;
      });
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
