import { Component, Input, OnInit } from '@angular/core';
import { PageGroup } from 'src/app/page.model';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css'],
})
export class GroupCardComponent implements OnInit {
  @Input() group!: PageGroup;
  displayOverlay: boolean;
  constructor() {
    this.displayOverlay = false;
  }

  ngOnInit(): void {}

  handleMouseEnter(event: Event) {
    if (!this.displayOverlay) {
      this.displayOverlay = true;
    }
  }
  handleMouseLeave(event: Event) {
    this.displayOverlay = false;
  }
}
