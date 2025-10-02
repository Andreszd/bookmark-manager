import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarLinkComponent } from '../sidebar-link/sidebar-link.component';
import { SidebarSectionHeadingComponent } from '../sidebar-section-heading/sidebar-section-heading.component';
import { SidebarSectionComponent } from '../sidebar-section/sidebar-section.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarLinkComponent,
    SidebarSectionHeadingComponent,
    SidebarSectionComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
