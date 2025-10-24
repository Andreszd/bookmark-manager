import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar-link',
  templateUrl: './sidebar-link.component.html',
  styleUrls: ['./sidebar-link.component.css'],
})
export class SidebarLinkComponent implements OnInit, AfterViewInit {
  @Input('routerLink') link?: string | string[] | null;
  //isActive = false;
  //private routerSubscription?: Subscription;
  router = inject(Router);

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    //let link = Array.isArray(this.link) ? this.link.join('/') : this.link ?? '';
    //link = link.startsWith('/') ? link : `/${link}`;
    //this.routerSubscription = this.router.events
    //.pipe(
    //filter((event) => {
    //return event instanceof NavigationEnd;
    //})
    //)
    //.subscribe((value) => {
    //const url = (value as NavigationEnd).url;
    //if (url === link || (url === '/' && link === '')) {
    //this.isActive = true;
    //} else {
    //this.isActive = false;
    //}
    //});
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    //this.routerSubscription?.unsubscribe();
  }
}
