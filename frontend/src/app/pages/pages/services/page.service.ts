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

  route = inject(ActivatedRoute);

  getAll(param?: { groupId: string; queries?: Record<string, any> }) {
    this.loadingFlagService.toggle();
    return this.pageApiService.getAll<Page[]>(param?.groupId).pipe(
      map((value) => value.data),
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }

  refresh() {
    const groupId = this.route.snapshot.paramMap.get('id')!;

    this.getAll({ groupId }).subscribe((value) => {
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
