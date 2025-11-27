import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Url } from 'libs/shared-types';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  skip,
  startWith,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { BookmarkService } from 'src/app/shared/services/bookmark.service';
import { PaginationService } from 'src/app/shared/services/pagination.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {
  bookmarkService = inject(BookmarkService);
  paginationService = inject(PaginationService);
  searchControl = new FormControl('');
  @ViewChild('container') el!: ElementRef<HTMLDivElement>;
  suscription!: Subscription;

  loading = this.bookmarkService.loading;

  isSearching = this.searchControl.valueChanges.pipe(
    map((value) => value?.length)
  );

  urls: Url<string>[] = [];

  groupId = new BehaviorSubject<string | null>(null);

  groupId$ = this.groupId.asObservable();

  stopped = false;

  /*
  ngAfterViewInit() {
    window.setTimeout(() => {
      const a = this.el.nativeElement.childNodes[8] as HTMLElement;
      window.scrollTo({
        top:
          window.scrollY + a.getBoundingClientRect().top - window.innerHeight,
        behavior: 'smooth',
      });
    }, 2000);
  }
   */

  ngOnInit(): void {
    this.bookmarkService.getGroups();

    const search$ = this.searchControl.valueChanges.pipe(
      startWith(null),
      debounceTime(500),
      distinctUntilChanged()
    );

    const groupId$ = this.groupId.pipe(startWith(null));

    const resetTriggers$ = combineLatest([search$, groupId$]).pipe(
      tap(() => {
        this.paginationService.reset();
        this.urls = [];
        this.stopped = false;
      })
    );

    const data$ = combineLatest([
      search$,
      groupId$,
      this.paginationService.page$,
    ]).pipe(
      switchMap(([search, groupId, page]) => {
        return this.bookmarkService.getAll({
          search: search!,
          groupId: groupId!,
          page,
        });
      }),
      tap((urls) => {
        if (urls.length) {
          this.urls = [...this.urls, ...urls];
        } else {
          this.stopped = true;
        }
      })
    );

    merge(resetTriggers$, data$).subscribe();
  }

  getNextPage() {
    if (!this.stopped) {
      this.paginationService.next();
    }
  }

  selectGroup(groupId: string) {
    this.searchControl.setValue('', undefined);
    this.groupId.next(this.groupId.value ? null : groupId!);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
