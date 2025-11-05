import { Component, inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { BookmarkService } from './shared/services/bookmark.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'extension';
  authService = inject(AuthService);
  bookmarkService = inject(BookmarkService);

  constructor() {}

  login() {
    chrome.windows.create({
      url: 'http://localhost:4200/auth?login_from_extension=true',
      type: 'popup',
      width: 500,
      height: 600,
      left: screen.width / 2 - 250,
      top: screen.height / 2 - 300,
    });
  }
}
