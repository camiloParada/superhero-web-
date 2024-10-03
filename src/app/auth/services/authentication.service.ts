import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { User } from '../models';
import { AuthUtils } from '../helpers/auth.utils';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    private readonly _http: HttpClient,
    private readonly _router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * User login
   *
   * @param email
   * @param password
   * @returns user
   */
  login(email: string, password: string) {
    return this._http
      .post<any>(`${environment.apiUrl}/auth`, { email, password })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user?.access_token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));

            // notify
            this.currentUserSubject.next(user);
          }

          return user;
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // notify
    this.currentUserSubject.next(null!);

    this._router.navigate(['/login']);
  }

  /**
   * Check the authentication status
   */
  check(currentUrl: string): Observable<boolean> {
    // Check the access token availability
    if (!this.currentUserValue?.access_token) {
      this.logout();
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.currentUserValue.access_token)) {
      this.logout();
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    return of(true);
  }
}
