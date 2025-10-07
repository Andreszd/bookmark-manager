import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PageStateService } from 'src/app/page-state.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { FilterButtonComponent } from '../filter-button/filter-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, FilterButtonComponent],
  selector: 'app-pages-list-heading',
  templateUrl: './pages-list-heading.component.html',
  styleUrls: ['./pages-list-heading.component.css'],
})
export class PagesListHeadingComponent implements OnInit {
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesStateService = inject(PageStateService);

  selectedPageIds$ = this.pagesStateService.selectedPageIds$;

  selectedPageIdsLength$ = this.selectedPageIds$.pipe(
    map((value) => value.length)
  );

  layout$ = this.pagesListLayoutService.layout$;

  constructor() {}

  ngOnInit(): void {}
}
