import { NgModule } from '@angular/core';
import { TrashComponent } from './trash.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { SvgLoaderComponent } from 'src/app/shared/components/svg-loader/svg-loader.component';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [TrashComponent],
  imports: [PagesModule, EmptyStateComponent, SvgLoaderComponent],
})
export class TrashModule {}
