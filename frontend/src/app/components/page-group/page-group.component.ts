import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-group.component.html',
  styleUrls: ['./page-group.component.css']
})
export class PageGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
