import { Injectable } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipiesChanged = new Subject<Recipe[]>();

  private recipies: Recipe[] = [];

  constructor(private slSerivce: ShoppingListService) {}

  private onEmit() {
    this.recipiesChanged.next(this.recipies.slice());
  }

  setRecipies(recipes: Recipe[]) {
    this.recipies = recipes;
    this.onEmit();
  }

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
