import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  activeToInacvtiveCounter = 0;
  inactiveToActiveCounter = 0;

  incActiveToInactive() {
    this.activeToInacvtiveCounter++;
    console.log(this.activeToInacvtiveCounter);
  }

  incInactiveToActive() {
    this.inactiveToActiveCounter++;
    console.log(this.inactiveToActiveCounter);
  }
}
