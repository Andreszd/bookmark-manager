import { Component, inject, Injector, OnInit } from '@angular/core';
import { PageGroupAdapter } from '../../../pageGroup.adapter';
import { PanelSizeService } from '../../../panel-size.service';
import { PagesDragAndDropService } from '../../../pages-drag-and-drop.service';
import { PageApiService } from '../../../pages/pages/services/page-api.service';
import { PagesListLayoutService } from '../../../pages-list-layout.service';
import { PageStateService } from '../../../pages/pages/services/page-state.service';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  providers: [PanelSizeService, PagesDragAndDropService],
})
export class RootComponent {
  pageApiService = inject(PageApiService);
  pageGroupAdapter = inject(PageGroupAdapter);
  panelSizeService = inject(PanelSizeService);
  pagesDragAndDropService = inject(PagesDragAndDropService);
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesStateService = inject(PageStateService);

  constructor(private injector: Injector) {}
}
