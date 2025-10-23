import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Group } from '../../types';

type Form = {
  name: FormControl<string | null>;
};

@Component({
  selector: 'group-sidebar-link',
  templateUrl: './group-sidebar-link.component.html',
  styleUrls: ['./group-sidebar-link.component.css'],
})
export class GroupSidebarLinkComponent implements OnInit {
  @Input() group?: Group;
  @Input('form') formActive?: boolean;
  @Output() blur = new EventEmitter();

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
    if (this.formActive) {
      this.isEditing = true;
      this.autofocus();
    }
    if (this.group?.name) {
      this.form.get('name')?.setValue(this.group.name);
    }
  }

  handleMouseEnter(event: Event) {
    if (!this.displayOverlay) {
      this.displayOverlay = true;
    }
  }
  handleMouseLeave(event: Event) {
    this.displayOverlay = false;
  }

  autofocus() {
    window.setTimeout(() => {
      this.ref?.nativeElement?.focus();
      this.ref?.nativeElement?.select();
    }, 5);
  }

  enableEdition() {
    this.autofocus();
    this.isEditing = true;
  }

  disableEdition() {
    this.isEditing = false;
    this.blur.emit();
  }
}
