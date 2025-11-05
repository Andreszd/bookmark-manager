import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserStateService } from 'src/app/shared/services/user-state.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  route = inject(ActivatedRoute);
  userStateService = inject(UserStateService);
  authService = inject(AuthService);

  userState$ = this.userStateService.$state;

  constructor() {}

  ngOnInit(): void {}
}
