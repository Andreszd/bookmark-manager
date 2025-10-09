import { Component, Injector, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private injector: Injector) {}

  ngOnInit(): void {}
}
