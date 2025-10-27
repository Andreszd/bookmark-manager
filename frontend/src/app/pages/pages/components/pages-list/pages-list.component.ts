import { Component, inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { map, startWith, Subscription, switchMap } from 'rxjs';
import { PageStateService } from 'src/app/pages/pages/services/page-state.service';
import { DragAndDropService } from 'src/app/shared/services/drag-and-drop.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { actionPerformedEventPayload, Page } from 'src/app/pages/types';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RegisterGroupFormComponent } from 'src/app/pages/groups/components/register-group-form/register-group-form.component';

@Component({
  selector: 'pages',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css'],
})
export class PagesListComponent implements OnInit, OnDestroy {
  pageService = inject(PageService);
  pagesListLayoutService = inject(PagesListLayoutService);
  dragAndDropService = inject(DragAndDropService);
  pagesStateService = inject(PageStateService);
  dialogService = inject(DialogService);

  route = inject(ActivatedRoute);

  isDraggabling = false;
  selectedIds: string[] = [];
  suscription!: Subscription;

  cardHasHover?: number;
  layout$ = this.pagesListLayoutService.layout$;
  isGridLayout$ = this.layout$.pipe(
    map((value) => value === 'grid'),
    startWith(false)
  );

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.suscription = this.pagesStateService.selectedPageIds$.subscribe(
      (ids) => {
        this.selectedIds = ids;
      }
    );

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

  isDraggable(id: string) {
    return this.selectedIds.length ? this.selectedIds.includes(id) : true;
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  handleAction(pageId: string, action: actionPerformedEventPayload) {
    if (action === 'remove') {
      this.pageService.delete(pageId).subscribe(() => {
        const groupId = this.route.snapshot.paramMap.get('id')!;
        this.pageService.refresh({ groupId });
      });
    }
  }

  handleDragStart(pageId: string) {
    const selectedPagesIds = this.pagesStateService.getSelectedPageIds();

    if (selectedPagesIds.length) {
      this.isDraggabling = true;
    }

    this.dragAndDropService.handleDragStart(
      selectedPagesIds.length ? selectedPagesIds : pageId,
      'page'
    );
  }

  handleDrop(page: Page) {
    const { intention, data } =
      this.dragAndDropService.getIntention(page, 'page') ?? {};

    if (intention === 'createGroup') {
      const injector = Injector.create({
        providers: [
          {
            provide: 'onSubmit',
            useValue: () => {},
          },
          {
            provide: 'getInitialValues',
            useValue: () => ({
              name: 'Grupo',
              pageIds: data as number[],
            }),
          },
        ],
        parent: this.injector,
      });

      this.dialogService.open(RegisterGroupFormComponent, {
        title: 'Crear grupo',
        injector,
      });
    }
  }
}
