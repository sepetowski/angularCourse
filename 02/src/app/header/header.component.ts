import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuth = false;

  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe({
      next: (user) => {
        this.isAuth = !!user;
      },
    });
  }
  onLogout() {
    this.authService.logOut();
  }

  onSaveData() {
    this.dataStorage.storeRecipies();
  }
  onFetchRecipies() {
    this.dataStorage.fetchRecipies().subscribe();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
