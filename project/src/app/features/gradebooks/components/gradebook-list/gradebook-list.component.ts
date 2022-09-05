import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';
import { IRecord } from '../../interfaces/gradebook.interface';



@Component({
  selector: 'app-gradebook-list',
  templateUrl: './gradebook-list.component.html',
  styleUrls: ['./gradebook-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradebookListComponent implements OnInit {
  @Input() arrOfStudent$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject([] as ILoggedUSer[])
  @Input()  arrOfGradebooks$: BehaviorSubject<IRecord[]> = new BehaviorSubject(
    [] as IRecord[]
  );
  @Input() errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() student = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onAdd(student: ILoggedUSer):void{
    this.student.emit(student);
  }
}
