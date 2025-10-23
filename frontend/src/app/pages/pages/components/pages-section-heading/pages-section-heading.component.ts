import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DropdownService } from '../../../../shared/components/dropdown/services/Dropdown.service';
import { DropdownOriginDirective } from '../../../../shared/components/dropdown/directives/DropdownOriginDirective';

@Component({
  selector: 'pages-section-heading',
  templateUrl: './pages-section-heading.component.html',
  styleUrls: ['./pages-section-heading.component.css'],
})
export class PagesSectionHeadingComponent implements OnInit {
  dropdown = inject(DropdownService);
  @ViewChild('#dref') dropdownFormRef!: DropdownOriginDirective;
  constructor() {}

  ngOnInit(): void {}

  createPage(url?: string | null) {
    if (url) {
      this.dropdown.dropdownsOpened.get(this.dropdownFormRef)?.detach();
    }
  }
}
