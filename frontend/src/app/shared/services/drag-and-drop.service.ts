import { inject, Injectable } from '@angular/core';
import { Page } from '../../pages/types';
import { PageService } from '../../pages/pages/services/page.service';
import { Group } from 'src/app/pages/groups/types';

type dataType = 'page' | 'group';

@Injectable({ providedIn: 'root' })
export class DragAndDropService {
  activeDraggableItems: string[] = [];
  draggableItemType?: dataType;
  pageService = inject(PageService);

  constructor() {}

  handleDragStart(ids: string | string[], type: dataType) {
    this.activeDraggableItems = typeof ids === 'string' ? [ids] : ids;
    this.draggableItemType = type;
  }

  clean() {
    this.activeDraggableItems = [];
    this.draggableItemType = undefined;
  }

  getIntention(
    targetData: Page | Group,
    targetType: dataType
  ):
    | {
        intention: 'addUrl' | 'createGroup' | 'merge';
        data: { pageIds?: string[]; groupIds?: string[] };
      }
    | undefined {
    if (targetType === 'group') {
      if (this.draggableItemType === 'page') {
        return {
          intention: 'addUrl',
          data: {
            pageIds: this.activeDraggableItems,
          },
        };
      }

      if (this.draggableItemType === 'group') {
        return {
          intention: 'merge',
          data: {
            pageIds: this.activeDraggableItems,
            //groupIds: [targetData._id, this.activeDraggableItem],
          },
        };
      }
    }

    if (targetType === 'page') {
      if (this.draggableItemType === 'page') {
        return {
          intention: 'createGroup',
          data: {
            pageIds: [targetData._id, ...this.activeDraggableItems],
          },
        };
      }
    }
    return;
  }
}
