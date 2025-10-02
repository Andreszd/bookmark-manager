import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-section.component.html',
  styleUrls: ['./sidebar-section.component.css']
})
export class SidebarSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
