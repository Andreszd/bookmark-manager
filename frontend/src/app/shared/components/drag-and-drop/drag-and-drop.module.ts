import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { DraggableItemComponent } from './draggable-item/draggable-item.component';

@NgModule({
  declarations: [DropZoneComponent, DraggableItemComponent],
  imports: [CommonModule],
  exports: [DropZoneComponent, DraggableItemComponent],
})
export class DragAndDropModule {}
