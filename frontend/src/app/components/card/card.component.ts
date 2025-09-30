import { Component, Input, OnInit } from '@angular/core';

interface PageI {
  title: string;
  imgUrl: string;
}

@Component({
  selector: 'app-card',
  template: `
    <div
      class="card"
      [ngClass]="{active}"
      (mouseover)="showActions($event)"
      (mouseleave)="hideActions($event)"
    >
      <div
        class="card-img flex f-direction-col justify-content-center "
        [ngClass]="{ small: small }"
      >
        <svg
          class="svg-placeholder"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M21 5c0-1.1-.9-2-2-2H5.83L21 18.17zM2.81 2.81 1.39 4.22 3 5.83V19c0 1.1.9 2 2 2h13.17l1.61 1.61 1.41-1.41zM6 17l3-4 2.25 3 .82-1.1 2.1 2.1z"
          ></path>
        </svg>
      </div>
      <div
        class="card-body"
        [style.padding-top]="small ? '0.5rem' : '0px'"
        [style.padding-bottom]="small ? '0.5rem' : '0px'"
      >
        <ng-content select="[body]"></ng-content>
      </div>
      <ng-content select="[actions]"></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() props!: string;
  @Input() small!: boolean;
  @Input() page!: PageI;
  @Input() active!: boolean;
  mountActions: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  showActions(event: MouseEvent) {
    if (!this.mountActions) {
      this.mountActions = true;
    }
  }
  hideActions(event: MouseEvent) {
    this.mountActions = false;
  }
}
