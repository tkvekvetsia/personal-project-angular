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
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(
    !!this.tokenStorageService.getToken()
  );
  private loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    this.tokenStorageService.getUser()
  );
  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.tokenStorageService.getUser()?.status === 'Admin'
  );

  constructor(
    private tokenStorageService: TokenStorageService,
    private http: HttpClient,
    private backendService: BackendService,
    private router: Router
  ) {}

  public login(body: ILoginUser): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, body).pipe();
  }

  public logOut(): void {
    // localStorage.removeItem('auth_access');
    this.tokenStorageService.logOut();
    window.location.reload();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
    this.backendService.changeLoggedUserEmail('');
    this.backendService.changeUpdateUserId(-1);
    this.changeLoggedState(false);
    this.backendService.changeUpdateState(false);
    this.changeLoggedUser({} as ILoggedUSer);

    // this.backendService.
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
