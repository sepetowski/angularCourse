import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent {
  recipies: Recipe[] = [new Recipe('Test', 'Test desc', null)];
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  onSelectedRecipe(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
