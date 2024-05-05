import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;
  id: number;

  constructor(
    private recipeSerivce: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = Number(params['id']);

      this.selectedRecipe = this.recipeSerivce.getRecipeByIndex(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipeSerivce.addToShoppingList(this.selectedRecipe.ingredients);
  }
  onEditRecipe() {
    this.router.navigate([`/recipes/${this.id}/edit`]);
  }
}
