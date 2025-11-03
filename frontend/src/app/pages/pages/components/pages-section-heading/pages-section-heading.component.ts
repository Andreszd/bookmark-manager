import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DropdownService } from '../../../../shared/components/dropdown/services/Dropdown.service';
import { DropdownOriginDirective } from '../../../../shared/components/dropdown/directives/DropdownOriginDirective';
import { PageService } from '../../services/page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { RefreshPagesService } from '../../services/refresh-pages.service';

@Component({
  selector: 'pages-section-heading',
  templateUrl: './pages-section-heading.component.html',
  styleUrls: ['./pages-section-heading.component.css'],
})
export class PagesSectionHeadingComponent implements OnInit {
  dropdown = inject(DropdownService);
  pageService = inject(PageService);
  @ViewChild('dref') dropdownFormRef!: DropdownOriginDirective;
  route = inject(ActivatedRoute);
  router = inject(Router);
  searchControl = new FormControl('');
  refreshPagesService = inject(RefreshPagesService);

  suscription!: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.suscription = this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.router.navigate([], {
          queryParams: { search: value },
          queryParamsHandling: 'merge',
        });
      });
  }

  createPage(url?: string | null) {
    const groupId = this.route.snapshot.paramMap.get('id')!;

    if (url) {
      this.pageService.create(url, groupId).subscribe(() => {
        this.dropdown.dropdownsOpened.get(this.dropdownFormRef)?.detach();
        this.refreshPagesService.refresh();
      });
    }
  }
  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}
