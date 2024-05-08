import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

interface JsonUser {
  id: string;
  email: string;
  _token: string;
  _tokenExpirationDate: string;
}

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseKey}`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseKey}`;

  //other type of Subjcet - the same as Subjcet but we have acces to initial value
  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: NodeJS.Timeout;

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    const user: JsonUser = JSON.parse(userData);

    const laodedUser = new User(
      user.id,
      user.email,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (!laodedUser.token) return;

    this.user.next(laodedUser);
    const expirationDuration =
      new Date(laodedUser.tokenExpirationDate).getTime() - new Date().getTime();

    this.autoLogOut(expirationDuration);
  }

  signUp(email: string, password: string) {
    return this.handleSignUpAnSignIn(this.signUpUrl, email, password);
  }

  loginIn(email: string, password: string) {
    return this.handleSignUpAnSignIn(this.signInUrl, email, password);
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  autoLogOut(exparatironDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, exparatironDuration);
  }

  private handleSignUpAnSignIn(url: string, email: string, password: string) {
    return this.http
      .post<AuthResponseData>(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError), tap(this.handleAuth.bind(this)));
  }

  private handleAuth(authData: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + Number(authData.expiresIn) * 1000
    );

    const authUser = new User(
      authData.localId,
      authData.email,
      authData.idToken,
      expirationDate
    );

    this.user.next(authUser);
    this.autoLogOut(Number(authData.expiresIn) * 1000);
    localStorage.setItem('userData', JSON.stringify(authUser));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMesage = 'An error occured';

    if (!err?.error?.error) return throwError(() => new Error(errorMesage));

    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMesage = 'This email exists already';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMesage = 'Wrong email or passowrd';
        break;
      default:
        errorMesage = 'Server error';
    }
    return throwError(() => new Error(errorMesage));
  }
}
