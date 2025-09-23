import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable()
export class DropdownService {
  dropdownsOpened: Map<string | number | OverlayRef, OverlayRef> = new Map();
  content: any;

  saveDropdownContent(content: any) {
    this.content = content;
  }

  registerDropdown(id: string | number | undefined, ref: OverlayRef) {
    this.dropdownsOpened.set(id ?? ref, ref);
  }

  unregisterDropdown(id: string | number | OverlayRef) {
    if (this.dropdownsOpened.has(id)) {
      this.dropdownsOpened.delete(id);
    }
  }
}
