import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';

@Injectable()
export class BookmarkService {
  http = inject(HttpClient);
  loading = false;
  isSaved = false;

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

  open() {
    chrome.tabs.create({ url: 'http://localhost:4200/' });
  }
}
