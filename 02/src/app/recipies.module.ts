import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RecipiesComponent } from './recipies/recipies.component';
import { RecipeDetailComponent } from './recipies/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipies/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipies/recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipies/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipies/recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipiesRoutingModule } from './recipies-routing.module';

@NgModule({
  declarations: [
    RecipiesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  //BrowserModules must be used only one - instead we use CommonModule
  imports: [CommonModule, RecipiesRoutingModule, ReactiveFormsModule],
})
export class RecipiesModule {}
