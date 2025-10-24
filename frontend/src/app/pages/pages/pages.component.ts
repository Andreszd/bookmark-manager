import { Component, inject, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs';
import { PageStateService } from 'src/app/pages/pages/services/page-state.service';
import { PagesDragAndDropService } from 'src/app/pages-drag-and-drop.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { DropActionsPageGroupService } from 'src/app/shared/services/drop-actions-page-group.service';
import { PageService } from './services/page.service';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  pageService = inject(PageService);
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesDragAndDropService = inject(PagesDragAndDropService);
  pagesStateService = inject(PageStateService);
  dropActionsPageGroupService = inject(DropActionsPageGroupService);

  cardHasHover?: number;
  layout$ = this.pagesListLayoutService.layout$;
  isGridLayout$ = this.layout$.pipe(
    map((value) => value === 'grid'),
    startWith(false)
  );

  constructor() {}

  ngOnInit(): void {
    this.pageService.getAll();
  }
}
