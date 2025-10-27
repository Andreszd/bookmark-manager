import { Component, inject, Injector, OnInit } from '@angular/core';
import { PanelSizeService } from '../../../panel-size.service';
import { PageApiService } from '../../../pages/pages/services/page-api.service';
import { PagesListLayoutService } from '../../../pages-list-layout.service';
import { PageStateService } from '../../../pages/pages/services/page-state.service';
import { DragAndDropService } from 'src/app/shared/services/drag-and-drop.service';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  providers: [PanelSizeService],
})
export class RootComponent {
  pageApiService = inject(PageApiService);
  panelSizeService = inject(PanelSizeService);
  pagesDragAndDropService = inject(DragAndDropService);
  pagesListLayoutService = inject(PagesListLayoutService);
  pagesStateService = inject(PageStateService);

  constructor(private injector: Injector) {}
}
