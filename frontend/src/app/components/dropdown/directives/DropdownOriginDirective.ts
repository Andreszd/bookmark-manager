import { Overlay } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { DropdownService } from '../services/Dropdown.service';

@Directive({ selector: '[dropdown-origin]' })
export class DropdownOriginDirective {
  dropdownService = inject(DropdownService);
  ref!: ElementRef;
  overlay = inject(Overlay);
  viewContainerRef = inject(ViewContainerRef);
  @Input() dropdownId?: string | number;

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

    const portal = new TemplatePortal(
      this.dropdownService.content,
      this.viewContainerRef
    );

    this.dropdownService.registerDropdown(this.dropdownId, overlay);

    overlay.attach(portal);

    overlay.outsidePointerEvents().subscribe(() => {
      this.dropdownService.unregisterDropdown(this.dropdownId ?? overlay);
      overlay.detach();
    });
  }
}
