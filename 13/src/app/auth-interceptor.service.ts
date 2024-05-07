import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

//interceptors - allows to add headers to all requests
// it runs before the reuqest is sent and before response is forwarded to subscribe
//it ther to work we need to add to app.module in poroviders this
//  providers: [
//     {
//         provide: HTTP_INTERCEPTORS,
//         useClass: AuthInterceptorService, -> our class
//         multi: true, -> we can have multiple Interceptors
//       },
//     ],
// HTTP_INTERCEPTORS, ->token it infomrs angular about injecton (all class we provided in useClass should be trated as HTTP Interceptors and run intercept method )
//Note the multi: true option. This required setting tells Angular that HTTP_INTERCEPTORS is a token for a multiprovider that injects an array of values, rather than a single value."
@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request is on its way');

    //be default in runs for evry reqest- if we want to run for specific api we have to specify using req object

    //req is readolny we need to clone
    //header.append will and new header to existing, will noit repalce old
    const newReq = req.clone({ headers: req.headers.append('Auth', 'xyz') });

    //we have to return the result of next.
    // next is an objcet that allow request to cotninute "jornuey"
    // need to pas req parameter
    return next.handle(newReq).pipe(tap((event) => console.log(event)));
  }
}
