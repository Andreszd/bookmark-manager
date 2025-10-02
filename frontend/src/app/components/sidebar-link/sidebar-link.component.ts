import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-link.component.html',
  styleUrls: ['./sidebar-link.component.css'],
})
export class SidebarLinkComponent implements OnInit, AfterViewInit {
  @Input() class!: { [key: string]: boolean };
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}
}
