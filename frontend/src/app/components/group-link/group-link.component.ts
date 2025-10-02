import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageGroup } from 'src/app/page.model';

type Form = {
  name: FormControl<string | null>;
};

@Component({
  selector: 'app-group-link',
  templateUrl: './group-link.component.html',
  styleUrls: ['./group-link.component.css'],
})
export class GroupLinkComponent implements OnInit {
  @Input() group!: PageGroup;
  @ViewChild('ref') ref!: ElementRef<HTMLInputElement>;
  displayOverlay: boolean;
  isEditing = false;
  form = new FormGroup<Form>({
    name: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.displayOverlay = false;
  }

  ngOnInit(): void {
    this.form.get('name')?.setValue(this.group.name);
  }

  handleMouseEnter(event: Event) {
    if (!this.displayOverlay) {
      this.displayOverlay = true;
    }
  }
  handleMouseLeave(event: Event) {
    this.displayOverlay = false;
  }

  enableEdition() {
    window.setTimeout(() => {
      this.ref?.nativeElement?.focus();
      this.ref?.nativeElement?.select();
    }, 5);
    this.isEditing = true;
  }

  disableEdition() {
    this.isEditing = false;
  }
}
