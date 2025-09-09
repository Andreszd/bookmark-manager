import { Component, inject, Injector } from '@angular/core';
import { PageService } from './page.service';
import { PageGroupAdapter } from './pageGroup.adapter';
import { Page, PageGroup } from './page.model';
import {
  GroupFormValues,
  RegisterGroupFormComponent,
} from './components/forms/register-group-form/register-group-form.component';
import { PanelSizeService } from './panel-size.service';
import { PageGroupDialogComponent } from './components/page-group-dialog/page-group-dialog.component';
import { PagesDragAndDropService } from './pages-drag-and-drop.service';
import { DialogService } from './dialog.service';
import { PageApiService } from './page-api.service';
import { DragSelectService } from './drag-select.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PanelSizeService, PagesDragAndDropService, DragSelectService],
})
export class AppComponent {
  pageService = inject(PageService);
  pageApiService = inject(PageApiService);
  pageGroupAdapter = inject(PageGroupAdapter);
  panelSizeService = inject(PanelSizeService);
  pagesDragAndDropService = inject(PagesDragAndDropService);
  dialogService = inject(DialogService);
  dragSelectService = inject(DragSelectService);

  constructor(private injector: Injector) {
    this.pageService.getData();
  }

  handleSubmit(value: GroupFormValues) {
    this.pageApiService.createGroup(value);

    this.pageService.getData();

    this.dialogService.close();
  }

  handleOnDrop(event: DragEvent, dropzoneData: PageGroup | Page) {
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
      this.pageApiService.addPageToGroup(...(data as [number, number]));
    }

    this.pageService.getData();
  }

  openFullInfoGroup(pageGroup: PageGroup) {
    const injector = Injector.create(
      [{ useValue: pageGroup, provide: 'pageGroup' }],
      this.injector
    );

    this.dialogService.open(PageGroupDialogComponent, {
      injector,
    });
  }
}
