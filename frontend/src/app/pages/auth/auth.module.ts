import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent, SvgLoaderComponent } from 'libs/ui';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent],
  imports: [
    CommonModule,
    SvgLoaderComponent,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
  ],
  exports: [AuthComponent],
  providers: [AuthService],
})
export class AuthModule {}
