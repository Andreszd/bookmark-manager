import { inject, Injectable } from '@angular/core';
import { Group } from '../types';
import { GroupApiService } from './group-api.service';
import { finalize, map } from 'rxjs';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';

@Injectable()
export class GroupService {
  groups: Group[] = [];
  private groupApiService = inject(GroupApiService);
  loadingFlagService = inject(LoadingFlagService);

  getAll() {
    this.loadingFlagService.toggle();
    this.groupApiService
      .getAll()
      .pipe(
        map((value) => value.data),
        finalize(() => {
          this.loadingFlagService.toggle();
        })
      )
      .subscribe((value) => {
        this.groups = value;
      });
  }
}
