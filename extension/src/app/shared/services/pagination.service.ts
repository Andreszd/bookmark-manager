import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PaginationService {
  page = new BehaviorSubject(1);

  page$ = this.page.asObservable();

  constructor() {}

  next() {
    this.page.next(this.page.value + 1);
  }

  set(page: number) {
    this.page.next(page);
  }

  reset() {
    this.page.next(1);
  }
}
