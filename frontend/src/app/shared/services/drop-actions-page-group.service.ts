import { inject, Injectable, Injector } from '@angular/core';
import {
  GroupFormValues,
  RegisterGroupFormComponent,
} from 'src/app/pages/groups/components/register-group-form/register-group-form.component';
import { DialogService } from 'src/app/dialog.service';
import { PageGroup } from 'src/app/page.model';
import { PagesDragAndDropService } from 'src/app/pages-drag-and-drop.service';
import { Page } from 'src/app/pages/types';

@Injectable({ providedIn: 'root' })
export class DropActionsPageGroupService {
  dialogService = inject(DialogService);
  pagesDragAndDropService = inject(PagesDragAndDropService);

  constructor(private injector: Injector) {}

  handleSubmit(value: GroupFormValues) {
    this.dialogService.close();
  }

  getActionPerformed(dropzoneData: PageGroup | Page) {
    const actionToDo =
      this.pagesDragAndDropService.getActionToDoAfterDrop(dropzoneData);

    if (!actionToDo) return;

    const { action, data = [] } = actionToDo;

    if (action === 'merge' || action === 'create') {
      const injector = Injector.create({
        providers: [
          {
            provide: 'onSubmit',
            useValue: this.handleSubmit.bind(this),
          },
          {
            provide: 'getInitialValues',
            useValue: () => ({
              name: 'Grupo',
              pageIds: data as number[],
            }),
          },
        ],
        parent: this.injector,
      });

      this.dialogService.open(RegisterGroupFormComponent, {
        title: action === 'merge' ? 'Combinar grupos' : 'Crear grupo',
        subtitle:
          action === 'merge'
            ? 'Los grupos se combinarán en uno solo'
            : undefined,
        injector,
      });
    }

    if (action === 'update') {
      //this.pageApiService.addPageToGroup(...(data as [number, number]));
    }
  }
}
