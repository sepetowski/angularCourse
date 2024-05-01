import { Component } from '@angular/core';

@Component({
  selector: 'app-display-deyails',
  templateUrl: './display-deyails.component.html',
  styleUrl: './display-deyails.component.css',
})
export class DisplayDeyailsComponent {
  isShown = true;
  btnClicks = [];

  onDisplay() {
    this.isShown = !this.isShown;
    this.btnClicks.push(this.btnClicks.length + 1);
  }
}
