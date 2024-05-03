import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../../models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('amountInput') amountInput: ElementRef<HTMLInputElement>;

  constructor(private shoppingListService: ShoppingListService) {}

  onSubmit() {
    const name = this.nameInput.nativeElement.value;
    const value = Number(this.amountInput.nativeElement.value);
    if (!name || !value) return;

    this.shoppingListService.addIngredient(new Ingredient(name, value));
  }
}
