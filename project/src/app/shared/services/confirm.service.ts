import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  private confirmValue$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  public getCofnirmValue():BehaviorSubject<boolean>{
    return this.confirmValue$;
  }

  public changeConfirmValue(value: boolean):void{
    this.confirmValue$.next(value);
  }
}
