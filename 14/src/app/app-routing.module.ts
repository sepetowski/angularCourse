import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
	{
		path: '',
		component: WelcomeComponent,
	},
	{
		path: 'about',
		loadComponent: () => import('./about/about.component').then((m) => m.AboutComponent),
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./dashboard/routes').then((mod) => mod.DASHBORAD_ROUTES),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
