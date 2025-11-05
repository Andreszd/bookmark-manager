import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { UserStateService } from '../services/user-state.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  router = inject(Router);
  injector = inject(Injector);

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
          const userStateService = this.injector.get(UserStateService);
          if (error.error?.error === 'SESSION_EXPIRED') {
            userStateService.set({
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
