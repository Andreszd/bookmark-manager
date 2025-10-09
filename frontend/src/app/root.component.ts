import { Component, inject, Injector, OnInit } from '@angular/core';
import { PageService } from './page.service';
import { PageGroupAdapter } from './pageGroup.adapter';
import { PanelSizeService } from './panel-size.service';
import { PagesDragAndDropService } from './pages-drag-and-drop.service';
import { DialogService } from './dialog.service';
import { PageApiService } from './page-api.service';
import { PagesListLayoutService } from './pages-list-layout.service';
import { PageStateService } from './page-state.service';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  providers: [PanelSizeService, PagesDragAndDropService],
})
export class RootComponent {
  pageService = inject(PageService);
  pageApiService = inject(PageApiService);
  pageGroupAdapter = inject(PageGroupAdapter);
  panelSizeService = inject(PanelSizeService);
  pagesDragAndDropService = inject(PagesDragAndDropService);
  dialogService = inject(DialogService);
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesStateService = inject(PageStateService);

  constructor(private injector: Injector) {
    this.pageService.getData();
  }
}
