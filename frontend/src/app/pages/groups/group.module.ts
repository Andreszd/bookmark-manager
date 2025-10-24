import { NgModule } from '@angular/core';
import { GroupSidebarSectionComponent } from './components/group-sidebar-section/group-sidebar-section.component';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'src/app/shared/components/sidebar/sidebar.module';
import { GroupSidebarLinkComponent } from './components/sidebar-group-link/group-sidebar-link.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { SvgLoaderComponent } from 'src/app/shared/components/svg-loader/svg-loader.component';
import { DragAndDropModule } from 'src/app/shared/components/drag-and-drop/drag-and-drop.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupService } from './services/group.service';
import { GroupApiService } from './services/group-api.service';
import { RegisterGroupFormComponent } from './components/register-group-form/register-group-form.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    GroupSidebarSectionComponent,
    GroupSidebarLinkComponent,
    RegisterGroupFormComponent,
  ],
  providers: [GroupService, GroupApiService],
  exports: [GroupSidebarSectionComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ReactiveFormsModule,
    EmptyStateComponent,
    SvgLoaderComponent,
    DragAndDropModule,
    LoadingSpinnerComponent,
  ],
})
export class GroupModule {}
