import { Injectable } from '@angular/core';
import { Ingredient } from '../../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  private emitChnges() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.emitChnges();
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.emitChnges();
  }
  update(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.emitChnges();
  }
  delete(index: number) {
    this.ingredients.splice(index, 1);
    this.emitChnges();
  }
}
