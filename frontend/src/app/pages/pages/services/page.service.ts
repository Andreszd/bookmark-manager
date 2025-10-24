import { inject } from '@angular/core';
import { PageApiService } from './page-api.service';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';
import { Page } from '../../types';
import { finalize, map } from 'rxjs';
import { PageStateService } from './page-state.service';

export class PageService {
  pageStateService = inject(PageStateService);
  pageApiService = inject(PageApiService);
  loadingFlagService = inject(LoadingFlagService);

  isLoading$ = this.loadingFlagService.$isLoading;
  pages$ = this.pageStateService.pages$;
  pagesLength$ = this.pageStateService.pages$.pipe(
    map((value) => value.length)
  );

  getAll() {
    this.loadingFlagService.toggle();
    this.pageApiService
      .getAll<Page[]>()
      .pipe(
        map((value) => value.data),
        finalize(() => {
          this.loadingFlagService.toggle();
        })
      )
      .subscribe((value) => {
        this.pageStateService.setPages(value);
      });
  }

  create(url: string) {
    this.loadingFlagService.toggle();
    return this.pageApiService.create({ url }).pipe(
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }

  isPageGroup(data: any) {
    return false;
  }
}
