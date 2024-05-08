import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../../models/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private url =
    'https://angular-course-f67b5-default-rtdb.europe-west1.firebasedatabase.app/recipies.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipies() {
    const recipes = this.recipeService.getRecipies();
    this.http.put(this.url, recipes).subscribe();
  }

  fetchRecipies() {
    return this.http.get<Recipe[]>(this.url).pipe(
      map((recipies) =>
        recipies.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        })
      ),
      tap((recipies) => this.recipeService.setRecipies(recipies))
    );
  }
}
