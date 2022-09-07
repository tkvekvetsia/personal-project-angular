import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  of,
  ReplaySubject,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { ISubject } from '../../interfaces/subject.interface';
import { SubjectService } from '../../services/subject.service';
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectListComponent implements OnInit {
  @Input() errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Input() subjects$: BehaviorSubject<ISubject[]> = new BehaviorSubject(
    [] as ISubject[]
  );
  @Output() addState = new EventEmitter<boolean>();
  @Output() deletedId = new EventEmitter<number>();
  @Input() user$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    {} as ILoggedUSer
  );

 


  constructor() {}

  ngOnInit(): void {}

  public onDelete(id: number): void {
    this.deletedId.emit(id);
  }

  public onAddSubject(): void {
    this.addState.emit(true);
  }
}
