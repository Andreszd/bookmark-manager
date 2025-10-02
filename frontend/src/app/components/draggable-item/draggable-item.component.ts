import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'draggable-item',
  templateUrl: './draggable-item.component.html',
  styleUrls: ['./draggable-item.component.css'],
})
export class DraggableItemComponent implements OnInit {
  @Input() id!: string | number;
  @Input() gosthImgUrl?: string;
  @Input() isDraggable = true;
  @Output() onDragStart = new EventEmitter<DragEvent>();
  gosthImg = new Image();
  isDragging = false;

  constructor() {}

  ngOnInit(): void {
    if (this.gosthImgUrl) {
      this.gosthImg.src = this.gosthImgUrl;
      this.gosthImg.onload = () => {};
    }
  }

  handleOnDragStart(event: DragEvent) {
    if (!this.isDraggable) return;

    this.isDragging = true;
    this.onDragStart.emit();

    if (this.gosthImgUrl) {
      event.dataTransfer?.setDragImage(this.gosthImg, -5, -5);
    }

    event.dataTransfer?.setData('id', this.id?.toString());
  }

  handleOnDragEnd(event: DragEvent) {
    this.isDragging = false;
  }
}
