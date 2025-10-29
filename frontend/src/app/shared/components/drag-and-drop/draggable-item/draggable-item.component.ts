import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'draggable-item',
  templateUrl: './draggable-item.component.html',
  styleUrls: ['./draggable-item.component.css'],
})
export class DraggableItemComponent implements OnInit {
  @Input() data!: { [key: string | 'id']: any } | string;
  @Input() gosthImgUrl?: string;
  @Input() isDraggable = true;
  @Input() isDraggabling = false;
  @Output() onDragStart = new EventEmitter<DragEvent>();
  @Output() onDragEnd = new EventEmitter<DragEvent>();
  gosthImg = new Image();
  isDraggablingInternal = false;

  constructor() {}

  ngOnInit(): void {
    if (this.gosthImgUrl) {
      this.gosthImg.src = this.gosthImgUrl;
      this.gosthImg.onload = () => {};
    }
  }

  handleOnDragStart(event: DragEvent) {
    if (!this.isDraggable) return;
    this.isDraggablingInternal = true;
    this.onDragStart.emit();

    if (this.gosthImgUrl) {
      event.dataTransfer?.setDragImage(this.gosthImg, -5, -5);
    }

    event.dataTransfer?.setData(
      'data',
      typeof this.data === 'object' ? JSON.stringify(this.data) : this.data
    );
  }

  handleOnDragEnd(event: DragEvent) {
    this.isDraggablingInternal = false;
    this.onDragEnd.emit();
  }
}
