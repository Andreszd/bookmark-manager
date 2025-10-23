import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages/pages.component';
import { TrashComponent } from './pages/trash/trash.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RootComponent } from './core/layout/root/root.component';
import { CanActivatePrivateRoutes } from './shared/services/can-activate-private-routes.service';
import { UserResolver } from './shared/resolvers/user.resolve';
import { UserService } from './shared/services/user.service';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [CanActivatePrivateRoutes],
    resolve: {
      user: UserResolver,
    },
    children: [
      { path: '', component: PagesComponent },
      { path: 'trash', component: TrashComponent },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [CanActivatePrivateRoutes],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivatePrivateRoutes, UserResolver, UserService],
})
export class AppRoutingModule {}
