import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ILoggedUSer,
  ILoginUser,
} from 'src/app/shared/itnerfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000';
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  public login(body: ILoginUser): Observable<ILoggedUSer> {
    return this.http.post<ILoggedUSer>(`${this.baseUrl}/login`, body);
  }


  //getters
  public getIsLoggedIn(): BehaviorSubject<boolean>{
    return this.isLoggedIn$;
  }
  //change isLoggedIn
  public changeLoggedState(value: boolean): void{
    this.isLoggedIn$.next(value)
  }
}
