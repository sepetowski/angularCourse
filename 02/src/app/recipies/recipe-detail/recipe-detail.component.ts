import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent {
  @Input() selectedRecipe: Recipe;

  constructor(private recipeSerivce: RecipeService) {}

  onAddToShoppingList() {
    this.recipeSerivce.addToShoppingList(this.selectedRecipe.ingredients);
  }
}
