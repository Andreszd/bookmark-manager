import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-section-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-section-heading.component.html',
  styleUrls: ['./sidebar-section-heading.component.css']
})
export class SidebarSectionHeadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
