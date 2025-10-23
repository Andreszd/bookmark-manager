import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from 'src/app/shared/components/svg-loader/svg-loader.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';

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
