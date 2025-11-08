import { NgModule } from '@angular/core';
import { TrashComponent } from './trash.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';
import { PagesModule } from '../pages/pages.module';
import { SvgLoaderComponent } from 'libs/ui';

@NgModule({
  declarations: [TrashComponent],
  imports: [PagesModule, EmptyStateComponent, SvgLoaderComponent],
})
export class TrashModule {}
