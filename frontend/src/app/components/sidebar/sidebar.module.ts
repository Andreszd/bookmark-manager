import { NgModule } from '@angular/core';
import { SidebarLinkComponent } from './sidebar-link/sidebar-link.component';
import { SidebarSectionComponent } from './sidebar-section/sidebar-section.component';
import { SidebarSectionHeadingComponent } from './sidebar-section-heading/sidebar-section-heading.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DragAndDropModule } from '../drag-and-drop/drag-and-drop.module';
import { SidebarGroupLinkComponent } from './sidebar-group-link/sidebar-group-link.component';
import { PagesDragAndDropService } from 'src/app/pages-drag-and-drop.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { SvgLoaderComponent } from '../svg-loader/svg-loader.component';
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
  declarations: [
    SidebarLinkComponent,
    SidebarSectionComponent,
    SidebarSectionHeadingComponent,
    SidebarLinkComponent,
    SidebarComponent,
    SidebarGroupLinkComponent,
  ],
  providers: [PagesDragAndDropService],
  imports: [
    DragAndDropModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EmptyStateComponent,
    SvgLoaderComponent,
    DropdownModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
