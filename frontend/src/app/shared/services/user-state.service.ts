import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type UserState = {
  isAuthenticated?: boolean;
  isLoading?: boolean;
  user?: {
    email: string;
  };
};
@Injectable({ providedIn: 'root' })
export class UserStateService {
  private state = new BehaviorSubject<UserState>({
    isAuthenticated: false,
    isLoading: false,
  });
  $state = this.state.asObservable();

  constructor() {}
  set(newState: UserState) {
    this.state.next({ ...this.state.value, ...newState });
  }
}
