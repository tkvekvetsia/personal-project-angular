import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginUser } from 'src/app/shared/itnerfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public login(body: ILoginUser){
    return this.http.post(`${this.baseUrl}/login`,  body)
  }
}
