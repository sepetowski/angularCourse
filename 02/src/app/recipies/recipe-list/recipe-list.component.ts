import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
})
export class RecipeListComponent implements OnInit {
  recipies: Recipe[] = [];

  constructor(private recipiesService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipies = this.recipiesService.getRecipies();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes/new']);
  }
}
