import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../types';

@Injectable({ providedIn: 'root' })
export class GroupStateService {
  private groups = new BehaviorSubject<Group[]>([]);
  groups$ = this.groups.asObservable();

  save(groups: Group[]) {
    this.groups.next(groups);
  }
}
