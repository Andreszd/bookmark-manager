import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Page } from '../../types';

@Injectable({ providedIn: 'root' })
export class PageStateService {
  private pages = new BehaviorSubject<Page[]>([]);

  private selectedPages = new BehaviorSubject<string[]>([]);

  pages$ = this.pages.asObservable();

  selectedPageIds$ = this.selectedPages.asObservable();

  pagesLength$ = this.selectedPageIds$.pipe(map((value) => value.length));

  constructor() {}

  getSelectedPageIds() {
    return this.selectedPages.value;
  }

  setPages(pages: Page[]) {
    this.pages.next(pages);
  }

  selectPage(id: string) {
    this.selectedPages.next([...this.selectedPages.value, id]);
  }

  unSelectPage(id: string) {
    this.selectedPages.next(
      this.selectedPages.value.filter((pageId) => pageId !== id)
    );
  }

  selectPages(ids: string[]) {
    this.selectedPages.next(ids);
  }

  /* with this you can create a derived state */
  isSelected$(id: string) {
    return this.selectedPageIds$.pipe(
      // Map the array of IDs to a single boolean value
      map((ids) => {
        // Use the standard Array.includes() method within the map operator
        return ids.includes(id);
      })
    );
  }

  isSelected(id: string) {
    return (
      this.selectedPages.value.find((pageId) => pageId === id) !== undefined
    );
  }

  clearSelection() {
    this.selectedPages.next([]);
  }
}
