import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragSelectService } from 'src/app/drag-select.service';

@Component({
  selector: 'drag-select-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drag-select-container.component.html',
  styleUrls: ['./drag-select-container.component.css'],
  providers: [DragSelectService],
  host: {
    class: 'drag-select-container',
    '(mousedown)': `dragSelectService.startSelection(
      $event,
      childRefs,
      triggerEventIfChildrenAreInSelectionZone.bind(this)
    )`,
  },
})
export class DragSelectContainerComponent implements OnInit, AfterContentInit {
  @Input() class!: string;
  @Output() onDetectNodes = new EventEmitter<string[]>();
  @ContentChildren('child', { descendants: true, read: ElementRef })
  children!: QueryList<ElementRef>;
  dragSelectService = inject(DragSelectService);
  childRefs: HTMLElement[] = [];

  constructor() {}

  ngOnInit(): void {}

  triggerEventIfChildrenAreInSelectionZone(idxs: string[]) {
    this.onDetectNodes.emit(idxs);
  }

  ngAfterContentInit(): void {
    this.children.forEach((child) => {
      this.childRefs.push(child.nativeElement);
    });
  }
}
