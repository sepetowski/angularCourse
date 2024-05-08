import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  isLogging = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;

    this.isLogging = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs = this.authService.signUp(email, password);

    if (this.isLogging) authObs = this.authService.loginIn(email, password);

    authObs.subscribe({
      next: (authData) => {
        this.isLogging = false;
        this.router.navigate(['/recipes']);
      },
      error: (error: string) => {
        this.error = error;
        this.isLogging = false;
      },
    });

    form.reset();
  }
}
