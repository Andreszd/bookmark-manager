import { Component } from '@angular/core';

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
export class PagesRootComponent {}
