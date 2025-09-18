import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropZoneComponent } from '../drop-zone/drop-zone.component';
import { DragSelectService } from 'src/app/drag-select.service';

@Component({
  selector: 'app-drag-select-container',
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
  @Output() onDetectNodes = new EventEmitter<number[]>();
  @ContentChildren(DropZoneComponent) children!: QueryList<DropZoneComponent>;
  dragSelectService = inject(DragSelectService);
  childRefs: HTMLElement[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.class);
  }

  triggerEventIfChildrenAreInSelectionZone(idxs: number[]) {
    this.onDetectNodes.emit(idxs);
  }

  ngAfterContentInit(): void {
    this.children.forEach((child) => {
      this.childRefs.push(child.ref.nativeElement);
    });
  }
}
