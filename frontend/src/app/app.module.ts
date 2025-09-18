import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DraggableItemComponent } from './components/draggable-item/draggable-item.component';
import { DropZoneComponent } from './components/drop-zone/drop-zone.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { PageCardBodyComponent } from './components/page-card-body/page-card-body.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DEFAULT_DIALOG_CONFIG, DialogModule } from '@angular/cdk/dialog';
import { RegisterGroupFormComponent } from './components/forms/register-group-form/register-group-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PageGroupDialogComponent } from './components/page-group-dialog/page-group-dialog.component';
import { UtilsService } from './utils.service';
import { PagesDragAndDropService } from './pages-drag-and-drop.service';
import { PageService } from './page.service';
import { DragSelectContainerComponent } from './components/drag-select-container/drag-select-container.component';
import { PagesSectionHeadingComponent } from './components/pages-section-heading/pages-section-heading.component';
import { PagesListHeadingComponent } from './components/pages-list-heading/pages-list-heading.component';
import { FilterButtonComponent } from './components/filter-button/filter-button.component';
import { ActiveIconDirective } from './directives';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    DetailComponent,
    DraggableItemComponent,
    DropZoneComponent,
    GroupCardComponent,
    PageCardBodyComponent,
    RegisterGroupFormComponent,
    PageGroupDialogComponent,
    PagesSectionHeadingComponent,
    PagesListHeadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogComponent,
    DialogModule,
    ReactiveFormsModule,
    DragSelectContainerComponent,
    FilterButtonComponent,
    ActiveIconDirective
  ],
  providers: [
    { provide: DEFAULT_DIALOG_CONFIG, useValue: { hasBackdrop: false } },
    UtilsService,
    PageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
