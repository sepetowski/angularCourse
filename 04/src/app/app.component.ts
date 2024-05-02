import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  numbers: number[] = [];

  onIntervalFired(value: number) {
    this.numbers.push(value);
  }
  onStopped(stop: boolean) {
    if (stop) this.numbers = [];
  }
}
