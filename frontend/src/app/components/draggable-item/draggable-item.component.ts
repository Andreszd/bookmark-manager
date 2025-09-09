import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'draggable-item',
  templateUrl: './draggable-item.component.html',
  styleUrls: ['./draggable-item.component.css'],
})
export class DraggableItemComponent implements OnInit {
  @Input() id!: string | number;
  @Output() onDragStart = new EventEmitter<DragEvent>();

  constructor() {}

  ngOnInit(): void {}

  handleOnDragStart(event: DragEvent) {
    this.onDragStart.emit();
    event.dataTransfer?.setData('id', this.id?.toString());
  }
}
