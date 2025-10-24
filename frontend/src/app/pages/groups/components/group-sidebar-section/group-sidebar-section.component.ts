import { Component, inject, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { PagesDragAndDropService } from 'src/app/pages-drag-and-drop.service';
import { DropActionsPageGroupService } from 'src/app/shared/services/drop-actions-page-group.service';
import { SaveGroupEventPayload } from 'src/app/pages/types';

@Component({
  selector: 'group-sidebar-section',
  templateUrl: './group-sidebar-section.component.html',
  styleUrls: ['./group-sidebar-section.component.css'],
})
export class GroupSidebarSectionComponent implements OnInit {
  pagesDragAndDropService = inject(PagesDragAndDropService);
  dropActionsPageGroupService = inject(DropActionsPageGroupService);

  groupService = inject(GroupService);
  showGroupForm = false;
  constructor() {}

  ngOnInit(): void {
    this.groupService.getAll();
  }

  showForm() {
    this.showGroupForm = true;
  }

  createGroup(payload: SaveGroupEventPayload) {
    this.groupService.create(payload.name).subscribe(() => {
      this.showGroupForm = false;
      this.groupService.getAll();
    });
  }
  update(id: string, payload: SaveGroupEventPayload) {
    this.groupService
      .update(id, payload.name)
      .subscribe({ error: payload.onError });
  }
}
