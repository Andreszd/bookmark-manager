import { inject, Injectable } from '@angular/core';
import { PageService } from './page.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class RefreshPagesService {
  pageService = inject(PageService);
  route = inject(ActivatedRoute);

  refresh() {
    const params = this.route.snapshot.paramMap;
    const queryParams = this.route.snapshot.queryParamMap;
    const page = this.pageService.paginationService.currentPage;

    const id = params.get('id')!;
    const category = params.get('category')!;

    const search = queryParams.get('search')!;
    const sortCreatedAt = queryParams.get('createdAt')! as 'asc' | 'desc';
    //const sortName = queryParams.get('name')! as 'asc' | 'desc';

    this.pageService.refresh({
      page,
      groupId: id,
      removed: category === 'trash',
      search,
      sortCreatedAt,
      //sortName,
    });
  }
}
