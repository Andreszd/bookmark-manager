import { inject, Injectable } from '@angular/core';
import { Group } from '../types';
import { GroupApiService } from './group-api.service';
import { finalize, map } from 'rxjs';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';
import { GroupStateService } from './group-state.service';

@Injectable()
export class GroupService {
  private groupApiService = inject(GroupApiService);
  groupStateService = inject(GroupStateService);
  groups$ = this.groupStateService.groups$;
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
        this.groupStateService.save(value);
      });
  }

  create(name: string, pageIds?: string[]) {
    this.loadingFlagService.toggle();
    return this.groupApiService.create({ name, urlIds: pageIds }).pipe(
      map((value) => value.data),
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }

  addPages(groupId: string, pageIds: string[]) {
    this.loadingFlagService.toggle();
    return this.groupApiService.addPages(groupId, { urlIds: pageIds }).pipe(
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

  merge(groupIds: string[]) {
    this.loadingFlagService.toggle();
    return this.groupApiService.merge({ groupIds }).pipe(
      map((value) => value.data),
      finalize(() => {
        this.loadingFlagService.toggle();
      })
    );
  }
}
