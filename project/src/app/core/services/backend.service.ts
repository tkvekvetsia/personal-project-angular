import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public registerUser(body: IRegisteredUser): Observable<IRegisteredUser> {
    return this.http.post<IRegisteredUser>(`${this.baseUrl}/registe`, body);
  }

  public getAllUsers():Observable<IRegisteredUser[]> {
    return this.http.get<IRegisteredUser[]>(`${this.baseUrl}/users`);
  }
}
