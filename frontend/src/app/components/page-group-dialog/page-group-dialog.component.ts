import { Component, Inject, Input, OnInit } from '@angular/core';
import { PageGroup } from 'src/app/page.model';

@Component({
  selector: 'app-page-group-dialog',
  templateUrl: './page-group-dialog.component.html',
  styleUrls: ['./page-group-dialog.component.css'],
})
export class PageGroupDialogComponent implements OnInit {
  pageGroup!: PageGroup;
  constructor(@Inject('pageGroup') pageGroup: PageGroup) {
    this.pageGroup = pageGroup;
    console.log(pageGroup);
  }

  ngOnInit(): void {}
}
