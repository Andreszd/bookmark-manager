import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticating = false;
  isAuthenticated = false;
  private http = inject(HttpClient);
  userState = inject(UserStateService);

  auth(body: { email: string; password: string }) {
    this.isAuthenticating = true;
    return this.http.post<{ data: { token: string } }>('auth', body).pipe(
      map((value) => {
        this.userState.set({ isAuthenticated: true });
        window.localStorage.setItem('token', value?.data?.token);
      }),
      finalize(() => {
        this.isAuthenticating = false;
      })
    );
  }
}
