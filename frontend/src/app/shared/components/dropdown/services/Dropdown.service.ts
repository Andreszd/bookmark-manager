import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable, TemplateRef } from '@angular/core';
import { DropdownOriginDirective } from '../directives/DropdownOriginDirective';

@Injectable()
export class DropdownService {
  dropdownsOpened: Map<DropdownOriginDirective, OverlayRef> = new Map();
  content: Map<DropdownOriginDirective, TemplateRef<any>> = new Map();

  saveDropdownContent(origin: DropdownOriginDirective, content: any) {
    this.content.set(origin, content);
  }

  registerDropdown(origin: DropdownOriginDirective, ref: OverlayRef) {
    this.dropdownsOpened.set(origin, ref);
  }

  unregisterDropdown(origin: DropdownOriginDirective) {
    if (this.dropdownsOpened.has(origin)) {
      this.dropdownsOpened.delete(origin);
    }
  }
}
