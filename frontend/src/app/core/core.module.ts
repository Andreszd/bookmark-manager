import { NgModule } from '@angular/core';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { SidebarModule } from '../shared/components/sidebar/sidebar.module';
import { DropdownModule } from '../shared/components/dropdown/dropdown.module';
import { RootComponent } from './layout/root/root.component';
import { GroupModule } from '../pages/groups/group.module';
import { PagesModule } from '../pages/pages/pages.module';
import { AppRoutingModule } from '../app-routing.module';
import { SvgLoaderComponent } from 'libs/ui';

@NgModule({
  declarations: [SidebarComponent, RootComponent],
  imports: [
    CommonModule,
    SidebarModule,
    DropdownModule,
    SvgLoaderComponent,
    GroupModule,
    PagesModule,
    AppRoutingModule,
  ],
  exports: [RootComponent],
})
export class CoreModule {}
