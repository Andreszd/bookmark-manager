import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Page } from 'src/app/page.model';

type FieldFocus = 'title' | 'url';
type Form = {
  title: FormControl<string | null>;
  url: FormControl<string | null>;
};
@Component({
  selector: 'app-page-card-body',
  templateUrl: './page-card-body.component.html',
  styleUrls: ['./page-card-body.component.css'],
})
export class PageCardBodyComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @Input() small!: boolean;
  @Input() page!: Page;
  @ViewChild('titleF') titleRef!: ElementRef<HTMLInputElement>;
  @ViewChild('urlF') urlRef!: ElementRef<HTMLInputElement>;

  form = new FormGroup<Form>({
    title: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });
  editable = false;
  fieldFocus?: FieldFocus;

  hasRun = false;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  catchEnter(evt: KeyboardEvent) {
    if (evt.target && evt.key === 'Enter') {
    }
  }

  ngAfterViewChecked() {
    if (
      (this.titleRef?.nativeElement || this.urlRef?.nativeElement) &&
      this.editable &&
      !this.hasRun
    ) {
      if (this.fieldFocus === 'title' && this.titleRef?.nativeElement.focus) {
        this.titleRef?.nativeElement.focus();
        this.titleRef?.nativeElement.select();
      }
      if (this.fieldFocus === 'url') {
        this.urlRef?.nativeElement.focus();
        this.urlRef?.nativeElement.select();
      }
      this.hasRun = true;
    }
  }

  saveChanges() {
    this.disableEdition();
    this.hasRun = false;
  }

  enableEdition(fieldName: FieldFocus) {
    this.fieldFocus = fieldName;

    this.form.get('title')?.setValue(this.page.title);
    this.form.get('url')?.setValue(this.page.url);

    this.editable = true;
  }

  disableEdition() {
    this.editable = false;
  }
}
