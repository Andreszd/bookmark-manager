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
    map((value) => value?.length && this.loading)
  );

  ngOnInit(): void {
    this.bookmarkService.getAll();
    this.bookmarkService.getGroups();

    this.suscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        console.log(value);
        this.bookmarkService.getAll({ search: value! });
      });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  listUrlsByGroup(groupId: string) {
    if (!this.bookmarkService.urlsByGroup.has(groupId)) {
      this.bookmarkService.getAll({ groupId });
    }
  }
}
