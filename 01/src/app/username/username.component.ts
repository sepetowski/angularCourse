import { Component } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
})
export class UsernameComponent {
  username: '';

  onReset() {
    this.username = '';
  }
}