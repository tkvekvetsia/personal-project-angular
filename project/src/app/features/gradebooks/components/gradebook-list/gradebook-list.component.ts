import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { BehaviorSubject } from 'rxjs';
import { FadeAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-gradebook-list',
  templateUrl: './gradebook-list.component.html',
  styleUrls: ['./gradebook-list.component.scss'],
  animations: [FadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookListComponent implements OnInit {
  @Input() arrOfStudent$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );

  @Input() errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() student = new EventEmitter();
  @Output() displayPersonalGradebook = new EventEmitter();
  @Output() idNumber = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  public onAdd(student: ILoggedUSer): void {
    this.student.emit(student);
  }
  public onDisplayPersonalGradebook(value: boolean, idNumber: number): void {
    this.displayPersonalGradebook.emit(value);
    this.idNumber.emit(idNumber);
  }
}
