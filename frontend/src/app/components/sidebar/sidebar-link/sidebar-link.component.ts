import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar-link',
  templateUrl: './sidebar-link.component.html',
  styleUrls: ['./sidebar-link.component.css'],
})
export class SidebarLinkComponent implements OnInit, AfterViewInit {
  @Input('routerLink') link!: string;
  isActive = false;
  router = inject(Router);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((value) => {
        const url = (value as NavigationEnd).url;
        if (url.replace('/', '') === this.link) {
          this.isActive = true;
        } else {
          this.isActive = false;
        }
      });
  }

  ngAfterViewInit() {}
}
