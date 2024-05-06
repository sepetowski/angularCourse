import { Component } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipies',
  templateUrl: './recipies.component.html',
  providers: [RecipeService],
})
export class RecipiesComponent {
  constructor() {}
}
