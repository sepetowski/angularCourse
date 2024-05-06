import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //if we want to emit sometihn with service (wide large of compoents) we use Subejct instend of emmiter, if we want to pas new emit form chgild to parent comonent with @Output we use Emmiter
  activated = new Subject<boolean>();
  constructor() {}
}
