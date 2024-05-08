import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { RecipeService } from './recipe.service';
import { DataStorageService } from './data-storage.service';
import { Recipe } from '../../models/recipe.model';

export const recipiesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const dataStorage = inject(DataStorageService);
  const recipesService = inject(RecipeService);

  const recipes = recipesService.getRecipies();
  if (recipes.length === 0) {
    //we dont subscirbe bcs rresolver will subscirbe automaticly
    return dataStorage.fetchRecipies();
  }
  return recipes;
};
