import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { RootComponent } from './core/layout/root/root.component';
import { CanActivatePrivateRoutes } from './shared/services/can-activate-private-routes.service';
import { UserResolver } from './shared/resolvers/user.resolve';
import { UserService } from './shared/services/user.service';
import { PagesListComponent } from './pages/pages/components/pages-list/pages-list.component';
import { PagesRootComponent } from './pages/pages/pages-root-component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [CanActivatePrivateRoutes],
    resolve: {
      user: UserResolver,
    },
    children: [
      {
        path: 'page/:category/:id',
        component: PagesRootComponent,
        children: [{ path: '', component: PagesListComponent }],
      },
      {
        path: 'page/:category',
        component: PagesRootComponent,
        children: [{ path: '', component: PagesListComponent }],
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [CanActivatePrivateRoutes],
    children: [
      {
        path: '',
        component: AuthComponent,
      },
      {
        path: 'google',
        component: AuthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivatePrivateRoutes, UserResolver, UserService],
})
export class AppRoutingModule {}
