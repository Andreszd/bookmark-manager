import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { DropdownService } from '../../../../shared/components/dropdown/services/Dropdown.service';
import { DropdownOriginDirective } from '../../../../shared/components/dropdown/directives/DropdownOriginDirective';
import { PageService } from '../../services/page.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor() {}

  ngOnInit(): void {}

  createPage(url?: string | null) {
    const groupId = this.route.snapshot.paramMap.get('id')!;
    if (url) {
      this.pageService.create(url, groupId).subscribe(() => {
        this.dropdown.dropdownsOpened.get(this.dropdownFormRef)?.detach();
        this.pageService.refresh({ groupId });
      });
    }
  }
}
