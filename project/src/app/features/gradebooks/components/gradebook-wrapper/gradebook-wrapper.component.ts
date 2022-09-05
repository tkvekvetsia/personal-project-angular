import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';
import { BackendService } from 'src/app/core/services/backend.service';

@Component({
  selector: 'app-gradebook-wrapper',
  templateUrl: './gradebook-wrapper.component.html',
  styleUrls: ['./gradebook-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradebookWrapperComponent implements OnInit {
   students$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  ngOnInit(): void {
  }



  public onChangeAddState(value: boolean):void{
    this.addState$.next(value);
  }
}
