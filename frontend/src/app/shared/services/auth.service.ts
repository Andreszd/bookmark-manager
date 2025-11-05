import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, map, tap } from 'rxjs';
import { UserStateService } from './user-state.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticating = false;
  isAuthenticated = false;
  private http = inject(HttpClient);
  userState = inject(UserStateService);
  router = inject(Router);

  auth(
    body: { email: string; password: string },
    persistSession: boolean = true
  ) {
    this.isAuthenticating = true;
    return this.http.post<{ data: { token: string } }>('auth', body).pipe(
      tap((value) => {
        if (persistSession) {
          this.userState.set({ isAuthenticated: true });
          window.localStorage.setItem('token', value?.data?.token);
        }
      }),
      finalize(() => {
        this.isAuthenticating = false;
      })
    );
  }

  checkSession() {
    this.userState.set({ isLoading: true });
    return this.http
      .get<{ data: { valid: boolean; message: string } }>(`auth/status`)
      .pipe(
        tap(() => {
          this.userState.set({ isLoading: false });
        }),
        map((res) => res.data.valid)
      );
  }

  logout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/auth'], { replaceUrl: true });
  }
}
