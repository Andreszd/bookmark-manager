import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserOutputDto } from '../dtos/user.dto';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserOutputDto> {
  userService = inject(UserService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): UserOutputDto | Observable<UserOutputDto> | Promise<UserOutputDto> {
    return this.userService.getData();
  }
}
