import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from 'src/app/pages/types';

export type SubmitChangesPayload = {
  _id: string;
  body: {
    name?: string;
    url?: string;
  };
  success: (value: Partial<Page>) => void;
  error: () => void;
};

type FieldFocus = 'name' | 'url';
type Form = {
  name: FormControl<string | null>;
  url: FormControl<string | null>;
};
@Component({
  selector: 'page-card-body',
  templateUrl: './page-card-body.component.html',
  styleUrls: ['./page-card-body.component.css'],
})
export class PageCardBodyComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @Input() small!: boolean;
  @Input() page!: Page;
  @Input() isFormDisabled: boolean = false;
  @ViewChild('titleF') titleRef!: ElementRef<HTMLInputElement>;
  @ViewChild('urlF') urlRef!: ElementRef<HTMLInputElement>;
  @Output() submitChanges = new EventEmitter<SubmitChangesPayload>();
  @Output() isEditing = new EventEmitter<boolean>();

  form = new FormGroup<Form>({
    name: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });
  editable = false;
  fieldFocus?: FieldFocus;

  hasRun = false;
  disableBlurOnEnter = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngAfterViewChecked() {
    if (
      (this.titleRef?.nativeElement || this.urlRef?.nativeElement) &&
      this.editable &&
      !this.hasRun
    ) {
      if (this.fieldFocus === 'name' && this.titleRef?.nativeElement.focus) {
        this.titleRef?.nativeElement.focus();
        this.titleRef?.nativeElement.select();
      }
      if (this.fieldFocus === 'url' && this.urlRef?.nativeElement.focus) {
        this.urlRef?.nativeElement.focus();
        this.urlRef?.nativeElement.select();
      }
      this.hasRun = true;
    }
  }

  saveChanges(event: Event) {
    this.disableEdition();

    if (event instanceof FocusEvent && this.disableBlurOnEnter) {
      this.disableBlurOnEnter = false;
      return;
    }
    if (event instanceof KeyboardEvent) {
      this.disableBlurOnEnter = true;
    }

    if (this.form.valid) {
      const value = this.form.get(this.fieldFocus!)?.value?.trim();
      const prevValue = this.page[this.fieldFocus as keyof Page];

      if (value !== this.page[this.fieldFocus as keyof Page]) {
        this.page[this.fieldFocus!] = value!;

        this.submitChanges.emit({
          _id: this.page._id,
          body: {
            [this.fieldFocus as string]: value,
          },
          success: (value) => {
            this.page.name = value.name!;
            this.page.url = value.url!;
            this.page.thumbnailUrl = value.thumbnailUrl!;
          },
          error: () => {
            this.page[this.fieldFocus!] = prevValue as string;
          },
        });
      }
    }
    this.hasRun = false;
  }

  enableEdition(fieldName: FieldFocus) {
    if (this.isFormDisabled) return;

    this.fieldFocus = fieldName;

    this.isEditing.emit(true);
    this.form.get('name')?.setValue(this.page.name);
    this.form.get('url')?.setValue(this.page.url);

    this.editable = true;
  }

  disableEdition() {
    this.isEditing.emit(false);
    this.editable = false;
  }
}
