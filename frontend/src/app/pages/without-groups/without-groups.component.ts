import { Component, inject, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs';
import { PageStateService } from 'src/app/page-state.service';
import { PageService } from 'src/app/page.service';
import { PagesDragAndDropService } from 'src/app/pages-drag-and-drop.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { DropActionsPageGroupService } from 'src/app/shared/services/drop-actions-page-group.service';

@Component({
  selector: 'app-without-groups',
  templateUrl: './without-groups.component.html',
  styleUrls: ['./without-groups.component.css'],
})
export class WithoutGroupsComponent implements OnInit {
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

  ngOnInit(): void {}
}
