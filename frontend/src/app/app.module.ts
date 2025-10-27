import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DEFAULT_DIALOG_CONFIG, DialogModule } from '@angular/cdk/dialog';
import { TrashModule } from './pages/trash/trash.module';
import { AuthModule } from './pages/auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UrlInterceptor } from './shared/http/url-interceptor.http';
import { AuthInterceptor } from './shared/http/auth-interceptor.http';
import { CoreModule } from './core/core.module';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TrashModule,
    AuthModule,
    CoreModule,

    DialogModule,
    OverlayModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
