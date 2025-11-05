import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, mergeAll, Observable } from 'rxjs';
import { UserStateService } from './user-state.service';
import { inject, Injectable } from '@angular/core';

@Injectable()
export class CanActivatePrivateRoutes implements CanActivate {
  router = inject(Router);
  userStateService = inject(UserStateService);
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.url[0]?.path === 'auth') {
      return this.userStateService.$state.pipe(
        map((value) => {
          return value.isAuthenticated
            ? this.router.createUrlTree(['/page/all'])
            : true;
        })
      );
    } else {
      return this.userStateService.$state.pipe(
        map((value) => {
          return value.isAuthenticated
            ? true
            : this.router.createUrlTree(['/auth']);
        })
      );
    }
  }
}
