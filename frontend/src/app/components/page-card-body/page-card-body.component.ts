import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/page.model';

@Component({
  selector: 'app-page-card-body',
  templateUrl: './page-card-body.component.html',
  styleUrls: ['./page-card-body.component.css'],
})
export class PageCardBodyComponent implements OnInit, AfterViewInit {
  @Input() small!: boolean;
  @Input() page!: Page;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  catchEnter(evt: KeyboardEvent) {
    if (evt.target && evt.key === 'Enter') {
      this.saveChanges(
        (evt.target as HTMLInputElement).value,
        evt.target as HTMLInputElement
      );
    }
  }

  saveChanges(text: string, ref?: HTMLInputElement) {
    ref?.blur();
  }
}
