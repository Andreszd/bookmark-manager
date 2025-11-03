import { inject } from '@angular/core';
import { PageApiService } from './page-api.service';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';
import { Page } from '../../types';
import { finalize, map, tap } from 'rxjs';
import { PageStateService } from './page-state.service';
import { environment } from 'src/environments/environment';
import { PaginationService } from 'src/app/shared/services/pagination.service';

export class PageService {
  pageStateService = inject(PageStateService);
  pageApiService = inject(PageApiService);
  loadingFlagService = inject(LoadingFlagService);
  paginationService = inject(PaginationService);

  isLoading$ = this.loadingFlagService.$isLoading;
  action$ = this.loadingFlagService.$action;
  pages$ = this.pageStateService.pages$;
  pagesLength$ = this.pageStateService.pages$.pipe(
    map((value) => value.length)
  );

  getAll(param?: Parameters<typeof this.pageApiService.getAll>[0]) {
    this.loadingFlagService.toggle();
    return this.pageApiService
      .getAll<{ total: number; urls: Page[] }>(param)
      .pipe(
        tap((value) => {
          this.paginationService.setTotal(value.data.total);
        }),
        map((value) =>
          value.data.urls.map(
            (item) =>
              ({
                ...item,
                thumbnailUrl: item?.thumbnailUrl
                  ? `${environment.imgsBucketUrl}/${item?.thumbnailUrl}`
                  : undefined,
              } as Page)
          )
        ),
        finalize(() => {
          this.loadingFlagService.toggle();
        })
      );
  }

  refresh(param: Parameters<typeof this.getAll>[0]) {
    this.getAll(param).subscribe((value) => {
      this.pageStateService.setPages(value);
    });
  }

  create(url: string, groupId?: string) {
    this.loadingFlagService.toggle();
    return this.pageApiService.create({ url }, groupId).pipe(
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }

  delete(id: string) {
    this.loadingFlagService.toggle();
    return this.pageApiService.delete(id).pipe(
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }

  deleteMultiple(ids: string[]) {
    this.loadingFlagService.toggle();
    return this.pageApiService.deleteMultiple(ids).pipe(
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }

  update(...params: Parameters<typeof this.pageApiService.update>) {
    this.loadingFlagService.setAction('editing');
    return this.pageApiService.update(...params).pipe(
      map((value) => value.data as Page),
      finalize(() => {
        this.loadingFlagService.setAction('');
      })
    );
  }
}
