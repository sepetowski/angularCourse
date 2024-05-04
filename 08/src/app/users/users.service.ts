import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersService {
  users = [
    {
      id: 1,
      name: 'Max',
    },
    {
      id: 2,
      name: 'Anna',
    },
    {
      id: 3,
      name: 'Chris',
    },
  ];
}
