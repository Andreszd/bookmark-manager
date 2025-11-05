import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);

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
        const isSessionRequested =
          this.route.snapshot.queryParamMap.get('login_from_extension') ===
          'true';

        this.authService
          .auth(
            {
              email: values.email,
              password: values.password,
            },
            !isSessionRequested
          )
          .subscribe((value) => {
            if (isSessionRequested) {
              (window as any).chrome?.runtime?.sendMessage?.(
                environment.extensionId,
                { token: value?.data?.token },
                () => {
                  console.log('token sent to extension');
                }
              );
              return;
            }
            this.router.navigate(['/page/all'], { replaceUrl: true });
          });
      }
    }
  }
}
