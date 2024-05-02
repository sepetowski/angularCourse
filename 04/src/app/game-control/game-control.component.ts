import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css',
})
export class GameControlComponent implements OnDestroy {
  value = 0;
  timeOut;
  @Output() holdingEvent = new EventEmitter<number>();
  @Output() stopEvent = new EventEmitter<boolean>();

  onStop() {
    this.stopEvent.emit(true);
    clearTimeout(this.timeOut);
    this.value = 0;
  }

  onStart() {
    this.timeOut = setInterval(() => {
      this.value++;
      this.holdingEvent.emit(this.value);
    }, 1000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeOut);
  }
}
