import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { Ingredient } from '../../../models/ingredient.model';

interface Recipie {
  name: FormControl<string>;
  recipieImagePath: FormControl<string | null>;
  recipieDescription: FormControl<string>;
  ingredients: FormArray<FormGroup<IngredientGroup>>;
}

interface IngredientGroup {
  name: FormControl<string>;
  amount: FormControl<number>;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number | null;
  editMode = false;
  recipeForm: FormGroup<Recipie>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  get controls() {
    return (<FormArray<FormGroup<IngredientGroup>>>(
      this.recipeForm.get('ingredients')
    )).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipieImagePath = '';
    let recipieDescription = '';
    let ingredients: FormArray<FormGroup<IngredientGroup>> = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeByIndex(this.id);
      recipeName = recipe.name;
      recipieImagePath = recipe.imagePath ? recipe.imagePath : '';
      recipieDescription = recipe.description;

      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          const group = new FormGroup<IngredientGroup>({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/),
            ]),
          });
          ingredients.push(group);
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      recipieImagePath: new FormControl(recipieImagePath),
      recipieDescription: new FormControl(
        recipieDescription,
        Validators.required
      ),
      ingredients,
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }
  onAddIngredient() {
    this.recipeForm.controls.ingredients.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl(1, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }
  onDeleteIng(index: number) {
    this.recipeForm.controls.ingredients.removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.recipieDescription,
      this.recipeForm.value.recipieImagePath,
      this.recipeForm.value.ingredients as Ingredient[]
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }
    this.onCancel();
  }
}
