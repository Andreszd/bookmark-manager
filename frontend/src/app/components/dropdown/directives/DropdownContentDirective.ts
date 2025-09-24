import { Directive, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { DropdownService } from '../services/Dropdown.service';
import { DropdownOriginDirective } from './DropdownOriginDirective';

@Directive({ selector: '[dropdown-content]' })
export class DropdownContentDirective implements OnInit {
  dropdownService = inject(DropdownService);
  @Input('originConection') origin!: DropdownOriginDirective;

  element!: TemplateRef<any>;

  constructor(el: TemplateRef<any>) {
    this.element = el;
  }
  ngOnInit(): void {
    this.dropdownService.saveDropdownContent(this.origin, this.element);
  }
}
