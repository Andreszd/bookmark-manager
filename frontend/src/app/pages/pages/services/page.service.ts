import { inject } from '@angular/core';
import { PageApiService } from './page-api.service';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';
import { Page } from '../../types';
import { finalize, map } from 'rxjs';
import { PageStateService } from './page-state.service';
import { ActivatedRoute } from '@angular/router';

export class PageService {
  pageStateService = inject(PageStateService);
  pageApiService = inject(PageApiService);
  loadingFlagService = inject(LoadingFlagService);

  isLoading$ = this.loadingFlagService.$isLoading;
  pages$ = this.pageStateService.pages$;
  pagesLength$ = this.pageStateService.pages$.pipe(
    map((value) => value.length)
  );

  getAll(param?: Parameters<typeof this.pageApiService.getAll>[0]) {
    this.loadingFlagService.toggle();
    return this.pageApiService
      .getAll<Page[]>({ groupId: param?.groupId, removed: param?.removed })
      .pipe(
        map((value) => value.data),
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

  isPageGroup(data: any) {
    return false;
  }
}
