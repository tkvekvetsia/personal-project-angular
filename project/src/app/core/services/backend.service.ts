import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl: string = 'http://localhost:3000';
  private updateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private updateUserId$: BehaviorSubject<number> = new BehaviorSubject(-1);
  private loggedUserEmail$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {}

  //register user
  public registerUser(body: IRegisteredUser): Observable<IRegisteredUser> {
    return this.http.post<IRegisteredUser>(`${this.baseUrl}/register`, body);
  }

  //get all users
  public getAllUsers(): Observable<IRegisteredUser[]> {
    return this.http.get<IRegisteredUser[]>(`${this.baseUrl}/users`);
  }

  //update user
  public updateUser(body: IRegisteredUser): Observable<ILoggedUSer> {
    return this.http.patch<ILoggedUSer>(
      `${this.baseUrl}/users/${this.updateUserId$.getValue()}`,
      body
    );
  }

  //delete user
  public deleteUser(id: number): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/users/${id}`);
  }

  //getter
  public getUpdateState(): BehaviorSubject<boolean> {
    return this.updateState$;
  }

  public getLoggedUserEmail(): BehaviorSubject<string> {
    return this.loggedUserEmail$;
  }

  //change private datas
  public changeUpdateState(value: boolean): void {
    this.updateState$.next(value);
  }

  public changeUpdateUserId(id: number): void {
    this.updateUserId$.next(id);
  }

  public changeLoggedUserEmail(value: string): void {
    this.loggedUserEmail$.next(value);
  }
}
