import { Component, inject, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { SaveGroupEventPayload } from 'src/app/pages/types';
import { DragAndDropService } from 'src/app/shared/services/drag-and-drop.service';
import { Group } from '../../types';
import { PageService } from 'src/app/pages/pages/services/page.service';
import { RouteStateService } from 'src/app/shared/services/route-state.service';

@Component({
  selector: 'group-sidebar-section',
  templateUrl: './group-sidebar-section.component.html',
  styleUrls: ['./group-sidebar-section.component.css'],
})
export class GroupSidebarSectionComponent implements OnInit {
  dragAndDropService = inject(DragAndDropService);

  groupService = inject(GroupService);
  pageService = inject(PageService);
  routeStateService = inject(RouteStateService);
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

  handleDrop(group: Group) {
    const { intention, data } =
      this.dragAndDropService.getIntention(group, 'group') ?? {};

    if (intention === 'addUrl' && data?.pageIds?.length) {
      this.groupService.addPages(group._id, data?.pageIds).subscribe(() => {
        const groupId = this.routeStateService.getValues().get('id')!;

        this.pageService.refresh({ groupId });
      });
    }

    if (intention === 'merge') {
    }
  }
}
