import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DEFAULT_DIALOG_CONFIG, DialogModule } from '@angular/cdk/dialog';
import { RegisterGroupFormComponent } from './components/forms/register-group-form/register-group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageGroupDialogComponent } from './components/page-group-dialog/page-group-dialog.component';
import { UtilsService } from './utils.service';
import { DragSelectContainerComponent } from './components/drag-select-container/drag-select-container.component';
import { PagesSectionHeadingComponent } from './components/pages-section-heading/pages-section-heading.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { ActiveIconDirective } from './directives';
import { DropdownModule } from './components/dropdown/dropdown.module';
import { RegisterUrlComponent } from './components/forms/register-url/register-url.component';
import { SelectableCardComponent } from './components/selectable-card/selectable-card.component';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { WithoutGroupsModule } from './pages/without-groups/without-groups.module';
import { PageCardModule } from './components/page-card/page-card.module';
import { TrashModule } from './pages/trash/trash.module';
import { AuthModule } from './pages/auth/auth.module';
import { RootComponent } from './root.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterGroupFormComponent,
    PageGroupDialogComponent,
    PagesSectionHeadingComponent,
    RegisterUrlComponent,
    RootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogComponent,
    DialogModule,
    ReactiveFormsModule,
    DragSelectContainerComponent,
    FilterButtonComponent,
    ActiveIconDirective,
    DropdownModule,
    SelectableCardComponent,
    SidebarModule,
    WithoutGroupsModule,
    TrashModule,
    PageCardModule,
    AuthModule,
  ],
  providers: [
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: false } },
    UtilsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
