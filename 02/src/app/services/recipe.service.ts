import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipiesChanged = new Subject<Recipe[]>();
  private recipies: Recipe[] = [
    new Recipe('Test', 'Test desc', null, [
      new Ingredient('tomato', 2),
      new Ingredient('cucumber', 1),
    ]),
  ];

  private onEmit() {
    this.recipiesChanged.next(this.recipies.slice());
  }

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
  addRecipe(recipe: Recipe) {
    this.recipies.push(recipe);

    this.onEmit();
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipies[index] = recipe;
    this.onEmit();
  }
  deleteRecipe(index: number) {
    this.recipies.splice(index, 1);
    this.onEmit();
  }
}
