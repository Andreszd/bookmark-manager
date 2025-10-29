import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'warning-merge-group-dialog',
  templateUrl: './warning-merge-group-dialog.component.html',
  styleUrls: ['./warning-merge-group-dialog.component.css'],
})
export class WarningMergeGroupDialogComponent implements OnInit {
  onOk!: () => void;
  close!: () => void;
  constructor(
    @Inject('onOk') onOk: () => void,
    @Inject('close') close: () => void
  ) {
    this.onOk = onOk;
    this.close = close;
  }

  ngOnInit(): void {}
}
