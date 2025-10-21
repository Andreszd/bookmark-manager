import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { UserStateService } from './user-state.service';
import { UserOutputDto } from '../dtos/user.dto';

@Injectable()
export class UserService {
  private http = inject(HttpClient);
  userState = inject(UserStateService);

  getData() {
    this.userState.set({ isLoading: true });
    return this.http.get<UserOutputDto>('user').pipe(
      finalize(() => {
        this.userState.set({ isLoading: false });
      })
    );
  }
}
