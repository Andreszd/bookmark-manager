import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (code) {
      this.authService.authByCode(code).subscribe({
        next: () => {
          this.router.navigate(['/page/all'], { replaceUrl: true });
        },
        error: () => {
          this.router.navigate(['/auth'], { replaceUrl: true });
        },
      });
    }
  }
}
