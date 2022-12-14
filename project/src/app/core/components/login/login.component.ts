import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import {
  ILoginForm,
  ILoginUser,
} from 'src/app/shared/itnerfaces/login.interface';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}
  authErrorMessage$: BehaviorSubject<string> = new BehaviorSubject('');
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
          this.authErrorMessage$.next('');
          // console.log(v);
          this.tokenStorageService.saveToken(v.accessToken);
          this.tokenStorageService.saveUser(v.user);
          this.authService.changeLoggedState(
            !!this.tokenStorageService.getToken()
          );
          window.location.reload();
          // this.authService.changeLoggedUser(v.user);
          this.router.navigateByUrl('/profile');
        }),
        catchError((e) => {
          this.authErrorMessage$.next(e.error);
          setTimeout(() => {
            this.authErrorMessage$.next('');
          }, 3000);
          return of(null);
        })
      )
      .subscribe();
  }
}
