import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IRecord } from 'src/app/features/gradebooks/interfaces/gradebook.interface';
import { IStringNumberObj } from '../itnerfaces/gpa.interface';

@Injectable({
  providedIn: 'root',
})
export class GpaService {
  private gpa$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  public gpaCalculator(subjects: Array<string>, records: IRecord[]): number {
    let obj: IStringNumberObj = {};
    let gpa = 0;

    for (let i = 0; i < subjects.length; i++) {
      let result = 0;
      let avr: number = 1;
      let count = 0;
      for (let j = 0; j < records.length; j++) {
        if (subjects[i] === records[j].subject) {
          count++;
          obj[records[j].subject];
          result += records[j].mark;
          avr = result / count;
          obj[records[j].subject] = avr;
        }
      }
      count = 0;
    }
    let arr = Object.getOwnPropertyNames(obj);
    console.log(obj)
    for (let mark in obj) {
      gpa += obj[mark];
    }
    gpa = gpa / arr.length / 2.5;
    return gpa;
  }

  public getGpa(): BehaviorSubject<number> {
    return this.gpa$;
  }
}
