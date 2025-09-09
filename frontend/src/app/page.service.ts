import { inject } from '@angular/core';
import { Page, PageGroup } from './page.model';
import { PageGroupAdapter } from './pageGroup.adapter';
import { PageApiService } from './page-api.service';

export class PageService {
  pageGroupAdapter = inject(PageGroupAdapter);
  pageApiService = inject(PageApiService);

  pages!: Page[];
  listPageGroup!: PageGroup[];

  constructor() {
    this.getData();
  }

  isPageGroup(obj: PageGroup | Page): obj is PageGroup {
    return (obj as PageGroup).pages !== undefined;
  }

  getData() {
    const { pages, groups } = this.pageGroupAdapter.fromAPI(
      this.pageApiService.getAll()
    );
    this.listPageGroup = groups;
    this.pages = pages;
  }
}
