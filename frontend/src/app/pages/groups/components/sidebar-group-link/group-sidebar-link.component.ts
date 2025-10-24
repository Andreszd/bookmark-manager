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
import { SaveGroupEventPayload } from 'src/app/pages/types';

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
  @Output() save = new EventEmitter<SaveGroupEventPayload>();
  name = '';

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
    this.name = this.group?.name ?? '';

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

  triggerBlurEvent() {
    this.emitSubmitEvent();
    this.blur.emit();
  }

  emitSubmitEvent() {
    if (!this.formActive && !this.isEditing) return;

    if (this.form.valid) {
      let name = this.form.get('name')?.value?.trim() || '';

      if (this.isEditing && name === this.group?.name) {
        this.isEditing = false;
        return;
      }

      if (this.isEditing && this.group?.name && name !== this.group?.name) {
        this.name = name;
      }

      if (this.isEditing) {
        this.isEditing = false;
        this.ref?.nativeElement?.blur();
      }

      this.save.emit({
        name,
        onSuccess: () => {},
        onError: () => {
          this.name = this.group?.name ?? this.name;
          this.form.get('name')?.setValue(this.name);
        },
      });
    }
  }
}
