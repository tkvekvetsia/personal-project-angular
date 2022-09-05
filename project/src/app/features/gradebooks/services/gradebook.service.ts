import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecord } from '../interfaces/gradebook.interface';

@Injectable({
  providedIn: 'root'
})
export class GradebookService {
  private baseUrl: string = 'http://localhost:3000/gradebooks';
  constructor(private http: HttpClient) {}

  public registerRecord(body: IRecord): Observable<IRecord>{
    return this.http.post<IRecord>(this.baseUrl, body);
  }

}
