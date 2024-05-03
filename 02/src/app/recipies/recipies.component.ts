import { Component } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
})
export class RecipiesComponent {
  selectedRecipe: Recipe | null = null;

  onSelectRecipe(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
