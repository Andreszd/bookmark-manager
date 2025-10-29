import { Component, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PageStateService } from './services/page-state.service';

@Component({
  selector: 'pages-root',
  styles: [
    `
      :host {
        width: 100%;
        height: 100vh;
      }
    `,
  ],
  template: `
    <div class="flex f-direction-col pages-section h-full">
      <pages-section-heading></pages-section-heading>
      <div class="flex f-direction-col flex-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class PagesRootComponent {
  router = inject(Router);
  pageState = inject(PageStateService);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.pageState.clearSelection();
      }
    });
  }
}
