import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Subscription } from 'rxjs';
import { BookmarkService } from 'src/app/shared/services/bookmark.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  bookmarkService = inject(BookmarkService);
  searchControl = new FormControl('');

  suscription!: Subscription;

  loading = this.bookmarkService.loading;

  isSearching = this.searchControl.valueChanges.pipe(
    map((value) => value?.length)
  );

  groupId?: string;

  ngOnInit(): void {
    this.bookmarkService.getAll();
    this.bookmarkService.getGroups();

    this.suscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.bookmarkService.getAll({ search: value!, groupId: this.groupId });
      });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  listUrlsByGroup(groupId: string) {
    this.searchControl.setValue('', undefined);

    this.groupId = !this.groupId ? groupId : undefined;

    this.bookmarkService.getAll({ groupId: this.groupId });
  }
}
