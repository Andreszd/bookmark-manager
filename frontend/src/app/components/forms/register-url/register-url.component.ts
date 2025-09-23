import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i;

type Form = {
  url: FormControl<string | null>;
};

export type FormValues = FormGroup<Form>['value'];

@Component({
  selector: 'app-register-url',
  templateUrl: './register-url.component.html',
  styleUrls: ['./register-url.component.css'],
})
export class RegisterUrlComponent implements OnInit, AfterViewInit {
  form = new FormGroup<Form>({
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(urlRegex),
    ]),
  });
  @Output() onSubmit = new EventEmitter<FormValues>();

  @ViewChild('ref') ref!: ElementRef<HTMLInputElement>;

  constructor() {}

  ngAfterViewInit(): void {
    this.ref.nativeElement.focus();
  }

  ngOnInit(): void {}

  handleSubmit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
