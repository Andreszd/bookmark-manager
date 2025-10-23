import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Page } from '../../types';

@Injectable({ providedIn: 'root' })
export class PageStateService {
  private selectedPages = new BehaviorSubject<number[]>([]);

  selectedPageIds$ = this.selectedPages.asObservable();

  pagesLength$ = this.selectedPageIds$.pipe(map((value) => value.length));

  constructor() {}

  selectPage(id: number) {
    this.selectedPages.next([...this.selectedPages.value, id]);
  }

  unSelectPage(id: number) {
    this.selectedPages.next(
      this.selectedPages.value.filter((pageId) => pageId !== id)
    );
  }

  selectPages(ids: number[]) {
    this.selectedPages.next(ids);
  }

  /* with this you can create a derived state */
  isSelected$(id: number) {
    return this.selectedPageIds$.pipe(
      // Map the array of IDs to a single boolean value
      map((ids) => {
        // Use the standard Array.includes() method within the map operator
        return ids.includes(id);
      })
    );
  }

  isSelected(id: number) {
    return (
      this.selectedPages.value.find((pageId) => pageId === id) !== undefined
    );
  }

  clearSelection() {
    this.selectedPages.next([]);
  }
}
