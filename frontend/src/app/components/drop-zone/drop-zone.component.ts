import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css'],
})
export class DropZoneComponent implements OnInit {
  @Input() disabled!: boolean;
  @Input() activeStyles!: { [key: string]: string };
  @Output() onDrop = new EventEmitter<DragEvent>();
  @Output() dragEnter = new EventEmitter();
  @Output() dragLeave = new EventEmitter();
  @ViewChild('dropzone') ref!: ElementRef<HTMLElement>;

  hasOverlayElement = false;

  constructor() {}
  ngOnInit(): void {}

  handleOnDrop(evt: DragEvent) {
    if (this.disabled) return;

    this.onDrop.emit(evt);
    this.hasOverlayElement = false;
  }

  handleOnDragOver(evt: DragEvent) {
    if (this.disabled) return;
    evt.preventDefault();
  }

  handleOnDragEnter(evt: DragEvent) {
    if (this.disabled) return;
    evt.preventDefault();
    this.hasOverlayElement = true;
    this.dragEnter.emit();
  }

  handleOnDragLeave(evt: DragEvent) {
    if (this.disabled) return;
    const dropzone$ = this.ref.nativeElement;

    this.dragLeave.emit();
    if (
      evt.relatedTarget &&
      !dropzone$.contains(evt.relatedTarget as HTMLElement)
    ) {
      this.hasOverlayElement = false;
    }
  }

  getClassesCSS() {
    return {
      active: this.hasOverlayElement && !this.activeStyles,
    };
  }
}
