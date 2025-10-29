import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

type Filter = {
  name: string;
  actions: string[];
};

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.css'],
})
export class FilterButtonComponent implements OnInit, AfterContentInit {
  active: boolean = false;
  @Input() filter!: Filter;
  @Output() onFilterChange = new EventEmitter<{
    name: string;
    action: string;
  }>();
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {}

  toggleActive() {
    this.active = !this.active;
    this.onFilterChange.emit({
      name: this.filter.name,
      action: !this.active ? this.filter.actions[0] : this.filter.actions[1],
    });
  }
}
