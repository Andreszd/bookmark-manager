import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/page.model';

@Component({
  selector: 'app-page-card-body',
  templateUrl: './page-card-body.component.html',
  styleUrls: ['./page-card-body.component.css'],
})
export class PageCardBodyComponent implements OnInit {
  @Input() small!: boolean;
  @Input() page!: Page;

  constructor() {
    console.log(this.page);
  }

  ngOnInit(): void {}
}
