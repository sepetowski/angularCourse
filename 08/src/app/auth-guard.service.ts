import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

// //first way
// @Injectable({
//   providedIn: 'root',
// })
// class AuthGuardService {
//   constructor(private router: Router, private authSerive: AuthService) {}

//   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const authenticated = await this.authSerive.isAuthenticated();
//     if (authenticated) return true;
//     else {
//       this.router.navigate(['/']);
//       return false;
//     }
//   }
// }

// export const canActivate: CanActivateFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => {
//   return inject(AuthGuardService).canActivate(route, state);
// };

// export const canActivateChild: CanActivateChildFn = (
//   route: ActivatedRouteSnapshot,
//   state: RouterStateSnapshot
// ) => canActivate(route, state);

//second way :
export const canActivate: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authenticated = await authService.isAuthenticated();
  if (authenticated) return true;
  else {
    router.navigate(['/']);
    return false;
  }
};

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => canActivate(route, state);
