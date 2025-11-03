import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PaginationService {
  private page = new BehaviorSubject<number>(1);
  size: number = 50;

  private total = new BehaviorSubject<number>(0);

  total$ = this.total.asObservable();
  page$ = this.page.asObservable();

  get currentPage() {
    return this.page.getValue();
  }

  setTotal(total: number) {
    this.total.next(total);
  }
  setPage(page: number) {
    this.page.next(page);
  }
}
