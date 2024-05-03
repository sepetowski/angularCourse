import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipies: Recipe[] = [
    new Recipe('Test', 'Test desc', null, [
      new Ingredient('tomato', 2),
      new Ingredient('cucumber', 1),
    ]),
  ];

  constructor(private slSerivce: ShoppingListService) {}

  getRecipies() {
    return this.recipies.slice();
  }
  addToShoppingList(ingredients: Ingredient[]) {
    this.slSerivce.addIngredients(ingredients);
  }
}
