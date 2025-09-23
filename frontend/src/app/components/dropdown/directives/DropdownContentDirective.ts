import { Directive, inject, TemplateRef } from '@angular/core';
import { DropdownService } from '../services/Dropdown.service';

@Directive({ selector: '[dropdown-content]' })
export class DropdownContentDirective {
  dropdownService = inject(DropdownService);

  element!: TemplateRef<any>;

  constructor(el: TemplateRef<any>) {
    this.element = el;
    this.dropdownService.saveDropdownContent(el);
  }
}
