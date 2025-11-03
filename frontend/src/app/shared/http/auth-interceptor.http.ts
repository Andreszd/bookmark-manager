import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStateService } from '../services/user-state.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  userStateService = inject(UserStateService);
  router = inject(Router);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = window.localStorage.getItem('token');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token),
      });
      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.error?.error === 'SESSION_EXPIRED') {
            this.userStateService.set({
              isAuthenticated: false,
              user: undefined,
            });
            this.router.navigate(['/auth']);
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
