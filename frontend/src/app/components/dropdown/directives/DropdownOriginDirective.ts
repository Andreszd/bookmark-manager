import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  ViewContainerRef,
} from '@angular/core';
import { DropdownService } from '../services/Dropdown.service';

@Directive({ selector: '[dropdown-origin]', exportAs: 'dropdown-origin' })
export class DropdownOriginDirective {
  dropdownService = inject(DropdownService);
  ref!: ElementRef;
  overlay = inject(Overlay);
  viewContainerRef = inject(ViewContainerRef);

  constructor(el: ElementRef) {
    this.ref = el.nativeElement;
  }

  @HostListener('click') onClick() {
    const overlay = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.ref)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
        ]),
    });

    const content = this.dropdownService.content.get(this);
    if (!content) return;

    const portal = new TemplatePortal(content, this.viewContainerRef);

    this.dropdownService.registerDropdown(this, overlay);

    overlay.attach(portal);

    overlay.outsidePointerEvents().subscribe(() => {
      this.dropdownService.unregisterDropdown(this);
      overlay.detach();
    });
  }
}
