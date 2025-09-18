import { BehaviorSubject } from 'rxjs';
import { LayoutType } from './types';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PagesListLayoutService {
  private layout = new BehaviorSubject<LayoutType>('list');

  layout$ = this.layout.asObservable();

  changeLayout() {
    this.layout.next(this.layout.value === 'grid' ? 'list' : 'grid');
  }

  getCurrentLayout() {
    return this.layout.value;
  }
}
