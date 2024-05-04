import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  logged: boolean;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.logged = this.authService.loggedIn;
  }

  onLoadServer(id: number) {
    this.router.navigate(['/servers', id, 'edit'], {
      queryParams: { allowEdit: '1' },
      fragment: 'laoding',
    });
  }

  onLogin() {
    this.authService.login();
    this.logged = this.authService.loggedIn;
  }
  onLogout() {
    this.authService.logout();
    this.logged = this.authService.loggedIn;
  }
}
