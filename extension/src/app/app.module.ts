import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookmarkService } from './shared/services/bookmark.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UrlInterceptor } from './shared/http/interceptors/url-interceptor.http';
import { AuthInterceptor } from './shared/http/interceptors/auth.interceptor';
import { ListAccordionModule } from './components/list-accordion/list-accordion.module';
import { MainComponent } from './pages/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'libs/ui';
import { InterSectionObserverDirective } from './shared/directives/intersection-observer.directive';
import { PaginationService } from './shared/services/pagination.service';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ListAccordionModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    InterSectionObserverDirective,
  ],
  providers: [
    BookmarkService,
    PaginationService,
    { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
