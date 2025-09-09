import { inject } from '@angular/core';
import { Page, PageGroup } from './page.model';
import { PageService } from './page.service';

export class PagesDragAndDropService {
  dropzoneId!: string | number;
  draggableItemData!: PageGroup | Page;
  pageService = inject(PageService);

  constructor() {}

  handleDragStart(
    dropzoneId: string | number,
    draggableItemData: PageGroup | Page
  ) {
    this.dropzoneId = dropzoneId;
    this.draggableItemData = draggableItemData;
  }

  getActionToDoAfterDrop(dropzoneData: PageGroup | Page): {
    action: 'merge' | 'create' | 'update';
    data: (string | number)[];
  } | void {
    if (
      (this.pageService.isPageGroup(this.draggableItemData) &&
        this.pageService.isPageGroup(dropzoneData)) ||
      (!this.pageService.isPageGroup(this.draggableItemData) &&
        !this.pageService.isPageGroup(dropzoneData))
    ) {
      if (
        this.pageService.isPageGroup(this.draggableItemData) &&
        this.pageService.isPageGroup(dropzoneData)
      ) {
        const pageIds = [
          ...this.draggableItemData.pages.map((page) => page.id),
          ...dropzoneData.pages.map((page) => page.id),
        ];

        return {
          action: 'merge',
          data: pageIds,
        };
      }

      if (
        !this.pageService.isPageGroup(this.draggableItemData) &&
        !this.pageService.isPageGroup(dropzoneData)
      ) {
        return {
          action: 'create',
          data: [dropzoneData.id, this.draggableItemData.id],
        };
      }
    }

    if (
      !this.pageService.isPageGroup(this.draggableItemData) &&
      this.pageService.isPageGroup(dropzoneData)
    ) {
      return {
        action: 'update',
        data: [this.draggableItemData.id, dropzoneData.id],
      };
    }
  }
}
