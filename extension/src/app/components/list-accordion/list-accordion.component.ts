import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'extension-list-accordion',
  templateUrl: './list-accordion.component.html',
})
export class ListAccordionComponent {
  @Input() header?: string;
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;
  @Output() displayContent = new EventEmitter();

  handleClick() {
    this.active = !this.active;
    if (this.active) {
      this.displayContent.emit();
    }
  }
}
