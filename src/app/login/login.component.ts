import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthenticationService } from '../auth/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  private _unsubscribeAll: Subject<any>;

  private readonly _authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  constructor() {
    this._unsubscribeAll = new Subject();
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    const storage = localStorage.getItem('currentUser');
    if (storage) {
      this.router.navigate(['/']);
    }
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this._authenticationService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
