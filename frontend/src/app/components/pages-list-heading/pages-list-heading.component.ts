import { Component, inject, OnInit } from '@angular/core';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';

@Component({
  selector: 'app-pages-list-heading',
  templateUrl: './pages-list-heading.component.html',
  styleUrls: ['./pages-list-heading.component.css'],
})
export class PagesListHeadingComponent implements OnInit {
  pagesListLayoutService = inject(PagesListLayoutService);

  layout$ = this.pagesListLayoutService.layout$;

  constructor() {}

  ngOnInit(): void {}
}
