import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isAcivated = false;
  private activatedSub: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSub = this.userService.activated.subscribe(
      (active) => (this.isAcivated = active)
    );
  }
  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
