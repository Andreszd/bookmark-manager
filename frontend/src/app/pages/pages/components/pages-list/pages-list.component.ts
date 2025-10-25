import { Component, inject, OnInit } from '@angular/core';
import { map, startWith, switchMap } from 'rxjs';
import { PageStateService } from 'src/app/pages/pages/services/page-state.service';
import { PagesDragAndDropService } from 'src/app/pages-drag-and-drop.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { DropActionsPageGroupService } from 'src/app/shared/services/drop-actions-page-group.service';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { actionPerformedEventPayload } from 'src/app/pages/types';

@Component({
  selector: 'pages',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css'],
})
export class PagesListComponent implements OnInit {
  pageService = inject(PageService);
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesDragAndDropService = inject(PagesDragAndDropService);
  pagesStateService = inject(PageStateService);
  dropActionsPageGroupService = inject(DropActionsPageGroupService);

  route = inject(ActivatedRoute);

  cardHasHover?: number;
  layout$ = this.pagesListLayoutService.layout$;
  isGridLayout$ = this.layout$.pipe(
    map((value) => value === 'grid'),
    startWith(false)
  );

  constructor() {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id')!;
          const category = params.get('category')!;
          return this.pageService.getAll({
            groupId: id,
            removed: category === 'trash',
          });
        })
      )
      .subscribe((values) => {
        this.pagesStateService.setPages(values);
      });
  }

  handleAction(pageId: string, action: actionPerformedEventPayload) {
    if (action === 'remove') {
      this.pageService.delete(pageId).subscribe(() => {
        const groupId = this.route.snapshot.paramMap.get('id')!;
        this.pageService.refresh({ groupId });
      });
    }
  }
}
