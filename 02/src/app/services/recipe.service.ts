import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
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
  getRecipeByIndex(index: number) {
    return this.recipies[index];
  }
  addToShoppingList(ingredients: Ingredient[]) {
    this.slSerivce.addIngredients(ingredients);
  }
}
