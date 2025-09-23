import { Component, inject, OnInit } from '@angular/core';
import { PageService } from 'src/app/page.service';
import { DropdownService } from '../dropdown/services/Dropdown.service';

@Component({
  selector: 'app-pages-section-heading',
  templateUrl: './pages-section-heading.component.html',
  styleUrls: ['./pages-section-heading.component.css'],
})
export class PagesSectionHeadingComponent implements OnInit {
  pageService = inject(PageService);
  dropdown = inject(DropdownService);
  constructor() {}

  ngOnInit(): void {}

  createPage(url?: string | null) {
    if (url) {
      this.pageService.create(url);
      this.dropdown.dropdownsOpened.get('dropdown-form')?.detach();
    }
  }
}
