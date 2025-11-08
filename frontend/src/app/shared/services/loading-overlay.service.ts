import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { LoadingSpinnerComponent } from 'libs/ui';

/* Note its necesary import overlay module */
@Injectable({ providedIn: 'root' })
export class LoadingOverlayService {
  private overlay = inject(Overlay);
  private overlayRef?: OverlayRef;

  show() {
    if (this.overlayRef) return;

    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    const spinnerPortal = new ComponentPortal(LoadingSpinnerComponent);
    const componentRef = this.overlayRef.attach(spinnerPortal);
    componentRef.instance.color = 'var(--primary-color)';
    componentRef.instance.size = '60px';

    componentRef.changeDetectorRef.detectChanges();
  }

  hide() {
    this.overlayRef?.detach();
    this.overlayRef = undefined;
  }
}
