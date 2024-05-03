import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  @Output() selectedRecipe = new EventEmitter<void>();

  onRecipeSelect() {
    this.selectedRecipe.emit();
  }
}
