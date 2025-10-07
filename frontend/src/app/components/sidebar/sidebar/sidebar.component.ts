import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/page.service';
import { PagesDragAndDropService } from 'src/app/pages-drag-and-drop.service';
import { DropActionsPageGroupService } from 'src/app/shared/services/drop-actions-page-group.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  pagesDragAndDropService = inject(PagesDragAndDropService);
  dropActionsPageGroupService = inject(DropActionsPageGroupService);
  pageService = inject(PageService);
  route = inject(ActivatedRoute);

  showGroupForm = false;

  constructor() {}

  ngOnInit(): void {}

  addGroup() {
    this.showGroupForm = true;
  }
}
