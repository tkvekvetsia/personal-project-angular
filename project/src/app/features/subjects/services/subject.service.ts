import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubject } from '../interfaces/subject.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public addSubject(body: ISubject ):Observable<ISubject>{
    return this.http.post<ISubject>(`${this.baseUrl}/subjects`, body);
  }
}
