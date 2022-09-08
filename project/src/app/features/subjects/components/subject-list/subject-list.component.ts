import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { ISubject } from '../../interfaces/subject.interface';
import { FadeAnimation } from 'src/app/shared/animations/animations';
import { EnterAnimation, ListAnimation, SlideIn } from 'src/app/shared/animations/table-animation';
@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss'],
  animations: [FadeAnimation, EnterAnimation, SlideIn, ListAnimation],
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
