import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'selectable-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selectable-card.component.html',
  styleUrls: ['./selectable-card.component.css'],
})
export class SelectableCardComponent implements OnInit {
  @Input() selected: boolean = false;
  @Input() isDisabled: boolean = false;
  showCheckbox: boolean = false;
  @Output() hasHover = new EventEmitter<boolean>();
  @Output() onSelect = new EventEmitter();
  @Output() onUnSelect = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onMouseOver(event: MouseEvent) {
    if (this.isDisabled) return;
    this.hasHover.emit(true);
    this.showCheckbox = true;
  }
  onMouseLeave(event: MouseEvent) {
    this.hasHover.emit(false);
    this.showCheckbox = false;
  }

  select() {
    this.onSelect.emit();
  }
  unSelect() {
    this.onUnSelect.emit();
  }
}
