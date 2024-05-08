import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(private dataStorage: DataStorageService) {}
  onSaveData() {
    this.dataStorage.storeRecipies();
  }
  onFetchRecipies() {
    this.dataStorage.fetchRecipies().subscribe();
  }
}
