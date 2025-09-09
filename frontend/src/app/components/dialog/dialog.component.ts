import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  readonly dialogRef = inject(DialogRef);
  data = inject(DIALOG_DATA);

  constructor() {}
  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
