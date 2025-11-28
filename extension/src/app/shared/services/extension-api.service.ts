import { inject, Injectable, NgZone } from '@angular/core';

@Injectable()
export class ExtensionApiService {
  ngZone = inject(NgZone);

  getTabUrl(): Promise<{ url?: string; title?: string }> {
    return new Promise((resolve, reject) => {
      this.ngZone.run(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
          resolve({ url: tab.url, title: tab.title });
        });
      });
    });
  }
}
