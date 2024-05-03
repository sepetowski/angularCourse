import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() routeSelected = new EventEmitter<'recipies' | 'shopping'>();

  onClickNavItem(route: 'recipies' | 'shopping') {
    this.routeSelected.emit(route);
  }
}
