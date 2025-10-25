import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { UserStateService } from './user-state.service';
import { UserOutputDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  private http = inject(HttpClient);
  userState = inject(UserStateService);

  getData() {
    this.userState.set({ isLoading: true });
    return this.http.get<UserOutputDto>('user').pipe(
      tap((values) => {
        this.userState.set({ user: { email: values.data?.email } });
      }),
      finalize(() => {
        this.userState.set({ isLoading: false });
      })
    );
  }
}
