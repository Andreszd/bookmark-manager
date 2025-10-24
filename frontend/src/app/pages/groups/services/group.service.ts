import { inject, Injectable } from '@angular/core';
import { Group } from '../types';
import { GroupApiService } from './group-api.service';
import { finalize, map, tap } from 'rxjs';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';

@Injectable()
export class GroupService {
  groups: Group[] = [];
  private groupApiService = inject(GroupApiService);
  loadingFlagService = inject(LoadingFlagService);
  loading$ = this.loadingFlagService.$isLoading;

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

  create(name: string) {
    this.loadingFlagService.toggle();
    return this.groupApiService.create({ name }).pipe(
      map((value) => value.data),
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }

  update(id: string, name: string) {
    this.loadingFlagService.toggle();
    return this.groupApiService.update(id, { name }).pipe(
      map((value) => value.data),
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }
}
