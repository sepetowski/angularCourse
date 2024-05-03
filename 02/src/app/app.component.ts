import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  route: 'recipies' | 'shopping' = 'recipies';

  onChangeRoute(route: 'recipies' | 'shopping') {
    this.route = route;
  }
}
