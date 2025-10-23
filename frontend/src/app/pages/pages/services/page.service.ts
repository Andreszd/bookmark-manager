import { inject } from '@angular/core';
import { PageApiService } from './page-api.service';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';
import { Page } from '../../types';
import { finalize, map } from 'rxjs';
import { PageStateService } from './page-state.service';

export class PageService {
  pages: Page[] = [];
  pageStateService = inject(PageStateService);
  pageApiService = inject(PageApiService);
  loadingFlagService = inject(LoadingFlagService);

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
        this.pages = value;
      });
  }

  isPageGroup(data: any) {
    return false;
  }
}
