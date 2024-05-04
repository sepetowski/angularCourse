import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { canActivate, canActivateChild } from './auth-guard.service';
import { canDeactivateGuard } from './can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { serverResolver } from './server-resolver.service';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id',
        component: UserComponent,
      },
    ],
  },
  {
    path: 'servers',
    component: ServersComponent,
    // canActivate: [canActivate],
    canActivateChild: [canActivateChild],

    children: [
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [canDeactivateGuard],
      },
      {
        path: ':id',
        component: ServerComponent,
        // dyniamc data
        resolve: { server: serverResolver },
      },
    ],
  },

  //static data with data
  {
    path: 'error',
    component: ErrorPageComponent,
    data: { message: 'Page not found' },
  },
  // CATCH ALL PATH YOU DONT KNOW - MUST BE AT LAST ROUTE
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
