import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
  ILoggedUSer,
  ILoginResponse,
} from 'src/app/shared/itnerfaces/login.interface';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl: string = 'http://localhost:3000';
  private updateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private updateUserId$: BehaviorSubject<number> = new BehaviorSubject(-1);
  private loggedUserEmail$: BehaviorSubject<string> = new BehaviorSubject('');
  private addUser$: BehaviorSubject<string> = new BehaviorSubject('');
  private students$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  private teachers$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );

  constructor(
    private http: HttpClient,
   
  ) {}

  //register user
  public registerUser(body: IRegisteredUser): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${this.baseUrl}/register`, body);
  }

  //get all users
  public getAllUsers(): Observable<ILoggedUSer[]> {
    return this.http.get<ILoggedUSer[]>(`${this.baseUrl}/users`);
  }
  //get users with same status
  public getSpecificUsers(status: string):Observable<ILoggedUSer[]>{
    return this.getAllUsers().pipe(
      map(v => {
        const arr = v.filter((value) => value.status === status);
        return arr;
      })
    )
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

  public getAddUser(): BehaviorSubject<string> {
    return this.addUser$;
  }

  public getStudents(): BehaviorSubject<ILoggedUSer[]> {
    return this.students$;
  }

  public getTeachers(): BehaviorSubject<ILoggedUSer[]> {
    return this.teachers$;
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

  public changeAddUser(value: string): void {
    this.addUser$.next(value);
  }

  public changeStudents(value: ILoggedUSer[]): void {
    this.students$.next(value);
  }

  public changeTeachers(value: ILoggedUSer[]): void {
    this.teachers$.next(value);
  }
}
