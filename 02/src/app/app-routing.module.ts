import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { recipiesResolver } from './services/recipies-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipiesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [recipiesResolver],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [recipiesResolver],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
