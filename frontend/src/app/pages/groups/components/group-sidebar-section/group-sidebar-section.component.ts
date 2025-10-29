import { Component, inject, Injector, OnInit } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { SaveGroupEventPayload } from 'src/app/pages/types';
import { DragAndDropService } from 'src/app/shared/services/drag-and-drop.service';
import { Group } from '../../types';
import { PageService } from 'src/app/pages/pages/services/page.service';
import { RouteStateService } from 'src/app/shared/services/route-state.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { WarningMergeGroupDialogComponent } from '../warning-merge-group-dialog/warning-merge-group-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'group-sidebar-section',
  templateUrl: './group-sidebar-section.component.html',
  styleUrls: ['./group-sidebar-section.component.css'],
})
export class GroupSidebarSectionComponent implements OnInit {
  dragAndDropService = inject(DragAndDropService);

  groupService = inject(GroupService);
  groups$ = this.groupService.groups$;
  pageService = inject(PageService);
  routeStateService = inject(RouteStateService);
  dialogService = inject(DialogService);
  router = inject(Router);

  showGroupForm = false;
  constructor(private injector: Injector) {}

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

  remove(evt: DragEvent) {
    const groupId = evt.dataTransfer?.getData('data');
    const pathId = this.routeStateService.getValues().get('id')!;

    if (!groupId) return;

    this.groupService.remove(groupId).subscribe(() => {
      this.groupService.getAll();
      if (groupId === pathId) {
        this.router.navigate(['/page', 'all'], { replaceUrl: true });
      }
    });
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
      const injector = Injector.create({
        providers: [
          {
            provide: 'onOk',
            useValue: () => {
              if (!data?.groupIds?.length) return;
              this.groupService.merge(data?.groupIds).subscribe(() => {
                this.router.navigate(['/page', 'group', data?.groupIds?.[0]], {
                  replaceUrl: true,
                });
                this.dialogService.close();
                this.groupService.getAll();
              });
            },
          },
          {
            provide: 'close',
            useValue: () => {
              this.dialogService.close();
            },
          },
        ],
        parent: this.injector,
      });

      this.dialogService.open(WarningMergeGroupDialogComponent, {
        title: 'Advertencia de fusión',
        injector,
      });
    }
  }
}
