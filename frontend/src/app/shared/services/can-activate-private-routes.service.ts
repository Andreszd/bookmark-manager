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
        map((value) =>
          value.isAuthenticated ? this.router.createUrlTree(['/']) : true
        )
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
