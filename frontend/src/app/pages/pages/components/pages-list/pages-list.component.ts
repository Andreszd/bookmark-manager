import { Component, inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, map, startWith, Subscription, switchMap } from 'rxjs';
import { PageStateService } from 'src/app/pages/pages/services/page-state.service';
import { DragAndDropService } from 'src/app/shared/services/drag-and-drop.service';
import { PagesListLayoutService } from 'src/app/pages-list-layout.service';
import { ActivatedRoute } from '@angular/router';
import { PageService } from '../../services/page.service';
import { actionPerformedEventPayload, Page } from 'src/app/pages/types';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { RegisterGroupFormComponent } from 'src/app/pages/groups/components/register-group-form/register-group-form.component';
import { RouteStateService } from 'src/app/shared/services/route-state.service';
import { GroupService } from 'src/app/pages/groups/services/group.service';
import { SubmitChangesPayload } from '../page-card/page-card-body/page-card-body.component';
import { RefreshPagesService } from '../../services/refresh-pages.service';

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
  groupService = inject(GroupService);

  route = inject(ActivatedRoute);
  routeStateService = inject(RouteStateService);

  isDraggabling = false;
  selectedIds: string[] = [];
  suscription!: Subscription;

  pageIdInEditing?: string;
  pageIdWithFormOpen?: string;

  cardHasHover?: number;
  layout$ = this.pagesListLayoutService.layout$;
  isGridLayout$ = this.layout$.pipe(
    map((value) => value === 'grid'),
    startWith(false)
  );

  refreshPagesService = inject(RefreshPagesService);

  constructor(private injector: Injector) {}

  ngOnInit(): void {
    this.suscription = this.pagesStateService.selectedPageIds$.subscribe(
      (ids) => {
        this.selectedIds = ids;
      }
    );

    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
      this.pageService.paginationService.page$,
    ])
      .pipe(
        switchMap(([params, queryParams, page]) => {
          this.routeStateService.save(params);

          const id = params.get('id')!;
          const category = params.get('category')!;

          const search = queryParams.get('search')!;
          const sortCreatedAt = queryParams.get('createdAt')! as 'asc' | 'desc';
          //const sortName = queryParams.get('name')! as 'asc' | 'desc';

          return this.pageService.getAll({
            page,
            groupId: id,
            removed: category === 'trash',
            search,
            sortCreatedAt,
            //sortName,
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
        this.refreshPagesService.refresh();
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
            useValue: (name: string) => {
              this.groupService.create(name, data?.pageIds).subscribe(() => {
                this.groupService.getAll();
                this.dialogService.close();
                const groupId = this.routeStateService.getValues().get('id')!;
                this.pageService.getAll({
                  groupId,
                });
              });
            },
          },
          {
            provide: 'getInitialValues',
            useValue: () => ({
              name: 'Grupo',
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

  updatePage(value: SubmitChangesPayload) {
    this.pageIdInEditing = value._id;
    this.pageService.update(value._id, value.body).subscribe({
      error: value.error,
      next: (values) => {
        value.success(values);
      },
      complete: () => {
        this.pageIdInEditing = undefined;
      },
    });
  }

  hideActions(editing: boolean, id: string) {
    this.pageIdWithFormOpen = editing ? id : undefined;
  }

  changePage(value: number) {
    this.pageService.paginationService.setPage(value);
  }
}
