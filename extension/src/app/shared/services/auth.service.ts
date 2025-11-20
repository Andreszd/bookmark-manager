import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = new BehaviorSubject(false);
  token: string | null = null;
  isAuthenticated$ = this.isAuthenticated
    .asObservable()
    .pipe(map((val) => val));

  constructor(private ngZone: NgZone) {
    chrome.storage.local.get(['token'], (result) => {
      this.ngZone.run(() => {
        this.setAuthenticated(result['token']);
      });
    });

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.event === 'token_received') {
        this.ngZone.run(() => {
          this.setAuthenticated(message.token);
        });
      }
      sendResponse({ status: 'acknowledged' });
    });
  }

  setAuthenticated(token?: string) {
    if (!token) {
      this.isAuthenticated.next(false);
      return;
    }
    this.token = token;
    this.isAuthenticated.next(true);
  }
}
