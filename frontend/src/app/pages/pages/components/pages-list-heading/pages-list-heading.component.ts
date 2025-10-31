import { Component, inject, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { PageStateService } from 'src/app/pages/pages/services/page-state.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'pages-list-heading',
  templateUrl: './pages-list-heading.component.html',
  styleUrls: ['./pages-list-heading.component.css'],
})
export class PagesListHeadingComponent implements OnInit {
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesStateService = inject(PageStateService);
  pagesService = inject(PageService);

  route = inject(ActivatedRoute);
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

  deleteSelectedPages() {
    const groupId = this.route.snapshot.paramMap.get('id')!;
    const search = this.route.snapshot.queryParamMap.get('search');
    const createdAt = this.route.snapshot.queryParamMap.get('createdAt');

    const selectedIds = this.pagesStateService.getSelectedPageIds();
    if (!selectedIds.length) return;

    this.pagesService.deleteMultiple(selectedIds).subscribe(() => {
      this.pagesService.refresh({
        groupId,
        search: search!,
        sortCreatedAt: createdAt ? (createdAt as 'asc' | 'desc') : undefined,
      });
    });
  }
}
