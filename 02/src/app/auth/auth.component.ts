import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../directives/placeholder.directive';
import { AlertComponent } from '../alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLogging = false;
  //it will serach for first item with such a type
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private sub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  private showErrorAlert(error: string) {
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    //must clear bcs there might be other components in this place
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = error;

    //wehn we subscrbie we basicly want to use Subject but wehen creating a component we have to use eventEmiter as Output infomration
    this.sub = componentRef.instance.close.subscribe(() => {
      this.sub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

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
        this.showErrorAlert(error);
        this.isLogging = false;
      },
    });

    form.reset();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
