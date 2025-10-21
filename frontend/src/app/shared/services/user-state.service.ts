import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type UserState = {
  isAuthenticated?: boolean;
  isLoading?: boolean;
};
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private state = new BehaviorSubject<UserState>({
    isAuthenticated: false,
    isLoading: false,
  });
  $state = this.state.asObservable();

  constructor() {
    const token = window.localStorage.getItem('token');
    this.state.next({ isAuthenticated: Boolean(token), isLoading: false });
  }
  set(newState: UserState) {
    this.state.next({ ...this.state.value, ...newState });
  }
}
