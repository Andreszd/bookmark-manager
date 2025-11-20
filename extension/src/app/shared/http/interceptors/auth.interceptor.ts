import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.token; // No token available in this context
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', token),
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error.error?.error === 'SESSION_EXPIRED') {
            this.authService.setAuthenticated();
          }
          return throwError(() => error);
        })
      );
    }

    return next.handle(req);
  }
}
