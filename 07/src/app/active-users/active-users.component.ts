import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css'],
})
export class ActiveUsersComponent {
  @Input() users: string[];

  constructor(private usersService: UserService) {}

  onSetToInactive(id: number) {
    this.usersService.setInactive(id);
  }
}
