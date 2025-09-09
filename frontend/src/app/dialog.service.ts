import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dialog = inject(Dialog);
  ref!: DialogRef<unknown, DialogComponent>;

  open(
    component: any,
    config: { title?: string; subtitle?: string; injector?: any }
  ) {
    this.ref = this.dialog.open(DialogComponent, {
      panelClass: 'dialog-container',
      hasBackdrop: true,
      data: {
        title: config?.title ?? 'Nuevo grupo',
        subtitle: config?.subtitle,
        customInjector: config?.injector,
        component,
      },
    });
  }

  close() {
    this.ref.close();
  }
}
