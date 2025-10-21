import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type UserState = {
  isAuthenticated: boolean;
};
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private state = new BehaviorSubject<UserState>({ isAuthenticated: false });
  $state = this.state.asObservable();

  constructor() {
    const token = window.localStorage.getItem('token');
    this.state.next({ isAuthenticated: Boolean(token) });
  }
  set(newState: UserState) {
    this.state.next({ ...this.state.value, ...newState });
  }
}
