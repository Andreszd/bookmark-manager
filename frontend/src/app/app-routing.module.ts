import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithoutGroupsComponent } from './pages/without-groups/without-groups.component';
import { TrashComponent } from './pages/trash/trash.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RootComponent } from './root.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    children: [
      { path: '', component: WithoutGroupsComponent },
      { path: 'trash', component: TrashComponent },
    ],
  },
  { path: 'auth', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
