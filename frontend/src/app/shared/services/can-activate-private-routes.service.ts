import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserStateService } from './user-state.service';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class CanActivatePrivateRoutes implements CanActivate {
  router = inject(Router);
  userStateService = inject(UserStateService);
  authService = inject(AuthService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.checkSession().pipe(
      map((isValid) => {
        if (route.url[0]?.path === 'auth') {
          return isValid ? this.router.createUrlTree(['/page/all']) : true;
        } else {
          return isValid ? true : this.router.createUrlTree(['/auth']);
        }
      })
    );
  }
}
