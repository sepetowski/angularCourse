import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //take - it tell how many ele,ments shoudl take and than unsubscirbe
    // exhaustMap- merge previous completed obervalbe into new obesrvalbe
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) return next.handle(req);

        const newReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(newReq);
      })
    );
  }
}
