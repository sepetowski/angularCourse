import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../../models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onReset() {
    this.editMode = false;
    this.form.reset();
  }
  onDelete() {
    this.shoppingListService.delete(this.editedItemIndex);
    this.onReset();
  }

  onSubmit() {
    const value = this.form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if (this.editMode)
      this.shoppingListService.update(this.editedItemIndex, ingredient);
    else this.shoppingListService.addIngredient(ingredient);

    this.onReset();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
