import { NgModule } from '@angular/core';
import { DragAndDropModule } from 'src/app/shared/components/drag-and-drop/drag-and-drop.module';
import { DragSelectContainerComponent } from 'src/app/shared/components/drag-select-container/drag-select-container.component';
import { PagesComponent } from './pages.component';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from 'src/app/shared/components/svg-loader/svg-loader.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { PagesListHeadingComponent } from 'src/app/pages/pages/components/pages-list-heading/pages-list-heading.component';
import { CardComponent } from './components/page-card/card/card.component';
import { PageCardActionsComponent } from './components/page-card/page-card-actions/page-card-actions.component';
import { PageCardBodyComponent } from './components/page-card/page-card-body/page-card-body.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'src/app/shared/components/dropdown/dropdown.module';
import { PagesSectionHeadingComponent } from './components/pages-section-heading/pages-section-heading.component';
import { SelectableCardComponent } from 'src/app/shared/components/selectable-card/selectable-card.component';
import { FilterButtonComponent } from 'src/app/shared/components/filter-button/filter-button.component';
import { PageService } from './services/page.service';
import { LoadingFlagService } from 'src/app/shared/services/loading-flag.service';
import { PageRegisterForm } from './components/page-register-form/page-register-form.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    PagesComponent,
    CardComponent,
    PageCardActionsComponent,
    PageCardBodyComponent,
    PagesListHeadingComponent,
    PagesSectionHeadingComponent,
    PageRegisterForm,
  ],
  imports: [
    DragAndDropModule,
    DragSelectContainerComponent,
    CommonModule,
    SvgLoaderComponent,
    EmptyStateComponent,
    ReactiveFormsModule,
    SelectableCardComponent,
    DropdownModule,
    FilterButtonComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    PagesComponent,
    PagesSectionHeadingComponent,
    PagesListHeadingComponent,
  ],
  providers: [LoadingFlagService, PageService],
})
export class PagesModule {}
