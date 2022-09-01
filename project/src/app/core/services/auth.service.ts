import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import {
  ILoggedUSer,
  ILoginResponse,
  ILoginUser,
} from 'src/app/shared/itnerfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private loggedUser$:BehaviorSubject<ILoggedUSer> = new BehaviorSubject({} as ILoggedUSer);

  constructor(private http: HttpClient) {}

  public login(body: ILoginUser): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.baseUrl}/login`, body);
  }


  //getters
  public getIsLoggedIn(): BehaviorSubject<boolean>{
    return this.isLoggedIn$;
  }

  public getLoggedUser(): BehaviorSubject<ILoggedUSer>{
    return this.loggedUser$
  }
  //change isLoggedIn
  public changeLoggedState(value: boolean): void{
    this.isLoggedIn$.next(value)
  }

  public changeLoggedUser(value: ILoggedUSer): void{
    this.loggedUser$.next(value)
  }
}
