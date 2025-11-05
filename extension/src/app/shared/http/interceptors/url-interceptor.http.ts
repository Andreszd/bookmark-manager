import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  readonly baseUrl = 'http://localhost:3000/api/';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.url.startsWith('http')) {
      const clonedReq = req.clone({
        url: `${this.baseUrl}${req.url}`,
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
