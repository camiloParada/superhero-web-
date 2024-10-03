import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
} from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate, CanActivateChild {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) {}

  // canActivate
  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      state.url.includes('authentication') &&
      this._authenticationService.currentUserValue
    ) {
      this._router.navigate(['/']);
    }

    return true;
  }

  canActivateChild(
    _childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (
      state.url.includes('authentication') &&
      this._authenticationService.currentUserValue
    ) {
      this._router.navigate(['/']);
    }

    return true;
  }
}
