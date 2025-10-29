import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PageStateService } from 'src/app/pages/pages/services/page-state.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pages-list-heading',
  templateUrl: './pages-list-heading.component.html',
  styleUrls: ['./pages-list-heading.component.css'],
})
export class PagesListHeadingComponent implements OnInit {
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesStateService = inject(PageStateService);

  router = inject(Router);
  selectedPageIds$ = this.pagesStateService.selectedPageIds$;

  selectedPageIdsLength$ = this.selectedPageIds$.pipe(
    map((value) => value.length)
  );

  layout$ = this.pagesListLayoutService.layout$;

  constructor() {}

  ngOnInit(): void {}

  setFilter(filter: { name: string; action: string }) {
    this.router.navigate([], {
      queryParams: { [filter.name]: filter.action },
      queryParamsHandling: 'merge',
    });
  }
}
