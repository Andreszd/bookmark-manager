import { NgModule } from '@angular/core';
import { TrashComponent } from './trash.component';
import { PagesListHeadingComponent } from 'src/app/components/pages-list-heading/pages-list-heading.component';
import { EmptyStateComponent } from 'src/app/components/empty-state/empty-state.component';
import { SvgLoaderComponent } from 'src/app/components/svg-loader/svg-loader.component';

@NgModule({
  declarations: [TrashComponent],
  imports: [PagesListHeadingComponent, EmptyStateComponent, SvgLoaderComponent],
})
export class TrashModule {}
