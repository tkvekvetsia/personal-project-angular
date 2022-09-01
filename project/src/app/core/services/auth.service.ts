import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, tap } from 'rxjs';
import {
  ILoggedUSer,
  ILoginResponse,
  ILoginUser,
} from 'src/app/shared/itnerfaces/login.interface';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    {} as ILoggedUSer
  );
  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private backendService: BackendService,
    private router: Router
  ) {}

  public login(body: ILoginUser): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, body).pipe(
      tap((v) => {
        if (v.user.status === 'Admin') {
          this.isAdmin$.next(true);
        } else {
          this.isAdmin$.next(false);
        }
      })
    );
  }

  public logOut(): void {
    // localStorage.removeItem('auth_access');
    this.backendService.changeLoggedUserEmail('');
    this.backendService.changeUpdateUserId(-1);
    this.changeLoggedState(false);
    this.backendService.changeUpdateState(false);
    this.changeLoggedUser({} as ILoggedUSer);
    // this.backendService.
    this.router.navigateByUrl('/login');
    this.isAdmin$.next(false);
  }

  //getters
  public getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn$;
  }

  public getLoggedUser(): BehaviorSubject<ILoggedUSer> {
    return this.loggedUser$;
  }

  public getIsAdmin(): BehaviorSubject<boolean> {
    return this.isAdmin$;
  }

  //change private properties
  public changeLoggedState(value: boolean): void {
    this.isLoggedIn$.next(value);
  }

  public changeLoggedUser(value: ILoggedUSer): void {
    this.loggedUser$.next(value);
  }

  public changeIsAdmin(value: boolean): void {
    this.isAdmin$.next(value);
  }
}
