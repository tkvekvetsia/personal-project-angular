import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import {
  ILoginForm,
  ILoginUser,
} from 'src/app/shared/itnerfaces/login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  authErrorMessage: BehaviorSubject<string> = new BehaviorSubject('');
  ngOnInit(): void {}

  //login form
  loginForm: FormGroup<ILoginForm> = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  public onLogin(): void {
    this.authService
      .login(this.loginForm.value as ILoginUser)
      .pipe(
        tap((v) => {
          this.authErrorMessage.next('');
          this.router.navigateByUrl('/profile')
        }),
        catchError((e) => {
          this.authErrorMessage.next(e.error);
          return of(null);
        })
      )
      .subscribe();
  }
}
