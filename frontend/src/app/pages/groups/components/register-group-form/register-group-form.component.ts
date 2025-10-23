import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

type Group = {
  name: FormControl<string | null>;
  pageIds?: FormControl<(string | number)[] | null>;
};

export type GroupFormValues = FormGroup<Group>['value'];

@Component({
  selector: 'app-register-group-form',
  templateUrl: './register-group-form.component.html',
  styleUrls: ['./register-group-form.component.css'],
})
export class RegisterGroupFormComponent implements AfterViewInit {
  form = new FormGroup<Group>({
    name: new FormControl('Grupo', Validators.required),
    pageIds: new FormControl([]),
  });
  @ViewChild('ref') ref!: ElementRef<HTMLInputElement>;
  onSubmit!: (value: GroupFormValues) => void;

  constructor(
    @Inject('onSubmit')
    onSubmit: (value: GroupFormValues) => void,
    @Inject('getInitialValues')
    getInitialValues: () => GroupFormValues | undefined
  ) {
    this.form.get('pageIds')?.setValue(getInitialValues()?.pageIds ?? null);
    this.onSubmit = onSubmit;
  }

  ngAfterViewInit(): void {
    this.ref.nativeElement.focus();
  }

  handleSubmit() {
    if (this.form.valid) {
      this.onSubmit(this.form.value);
    }
  }
}
