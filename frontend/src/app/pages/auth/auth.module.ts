import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from 'src/app/components/svg-loader/svg-loader.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent],
  imports: [CommonModule, SvgLoaderComponent],
  exports: [AuthComponent],
})
export class AuthModule {}
