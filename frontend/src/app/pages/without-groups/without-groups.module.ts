import { NgModule } from '@angular/core';
import { DragAndDropModule } from 'src/app/components/drag-and-drop/drag-and-drop.module';
import { DragSelectContainerComponent } from 'src/app/components/drag-select-container/drag-select-container.component';
import { WithoutGroupsComponent } from './without-groups.component';
import { SelectableCardComponent } from 'src/app/components/selectable-card/selectable-card.component';
import { PageCardModule } from 'src/app/components/page-card/page-card.module';
import { CommonModule } from '@angular/common';
import { SvgLoaderComponent } from 'src/app/components/svg-loader/svg-loader.component';
import { EmptyStateComponent } from 'src/app/components/empty-state/empty-state.component';
import { PagesListHeadingComponent } from 'src/app/components/pages-list-heading/pages-list-heading.component';

@NgModule({
  declarations: [WithoutGroupsComponent],
  imports: [
    DragAndDropModule,
    DragSelectContainerComponent,
    SelectableCardComponent,
    PageCardModule,
    CommonModule,
    SvgLoaderComponent,
    EmptyStateComponent,
    PagesListHeadingComponent,
  ],
  exports: [WithoutGroupsComponent],
})
export class WithoutGroupsModule {}
