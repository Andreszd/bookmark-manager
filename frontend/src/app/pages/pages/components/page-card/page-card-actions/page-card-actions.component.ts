import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { actionPerformedEventPayload } from 'src/app/pages/types';

const actions = [
  {
    key: 'watch',
    label: 'Ver',
    icon: `
        <svg
          class="icon"
          style="width: 20px"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"></path>
        </svg>
      `,
  },
  //{
  //key: 'edit',
  //label: 'Editar',
  //icon: `
  //<svg
  //class="icon"
  //style="width: 20px"
  //focusable="false"
  //aria-hidden="true"
  //viewBox="0 0 24 24"
  //>
  //<path
  //d="m14.06 9.02.92.92L5.92 19H5v-.92zM17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94z"
  //></path>
  //</svg>
  //`,
  //},
  {
    key: 'remove',
    label: 'Eliminar',
    icon: `
        <svg
          class="icon"
          style="width: 20px"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"></path>
        </svg>
      `,
  },
];

@Component({
  selector: 'page-card-actions',
  templateUrl: './page-card-actions.component.html',
  styleUrls: ['./page-card-actions.component.css'],
})
export class PageCardActionsComponent implements OnInit {
  actions = actions;
  sanitizer = inject(DomSanitizer);
  @Input() collapsed!: boolean;
  @Output() actionPerformed = new EventEmitter<actionPerformedEventPayload>();

  constructor() {}

  ngOnInit(): void {
    this.actions = this.actions.map((action) => ({
      ...action,
      icon: this.sanitizer.bypassSecurityTrustHtml(action.icon) as string,
    }));
  }

  performAction(key: string) {
    this.actionPerformed.emit(key as 'remove');
  }
}
