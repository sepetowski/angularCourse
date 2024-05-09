import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipies.module').then((m) => m.RecipiesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list.module').then((m) => m.ShoppingListModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    // prelaods all dynimcaly imported modules as soon as the page will loaded, it will not effect on fisrt load, it ttiggers only when the first page we are curently on was loaded
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
