import { NgModule } from '@angular/core';
import { PageCardBodyComponent } from './page-card-body/page-card-body.component';
import { PageCardActionsComponent } from './page-card-actions/page-card-actions.component';
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [
    PageCardBodyComponent,
    PageCardActionsComponent,
    CardComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, DropdownModule],
  exports: [PageCardBodyComponent, PageCardActionsComponent, CardComponent],
})
export class PageCardModule {}
