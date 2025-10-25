import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  login() {
    if (this.form.valid) {
      const values = this.form.value;
      if (values.email && values.password) {
        this.authService
          .auth({
            email: values.email,
            password: values.password,
          })
          .subscribe(() => {
            this.router.navigate(['/page/all'], { replaceUrl: true });
          });
      }
    }
  }
}
