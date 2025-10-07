import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutGroupsComponent } from './pages/without-groups/without-groups.component';
import { TrashComponent } from './pages/trash/trash.component';

const routes: Routes = [
  { path: '', component: WithoutGroupsComponent },
  { path: 'trash', component: TrashComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
