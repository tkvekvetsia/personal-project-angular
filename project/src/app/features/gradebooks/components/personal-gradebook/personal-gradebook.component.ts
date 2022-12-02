import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FadeAnimation } from 'src/app/shared/animations/animations';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { IRecord } from '../../interfaces/gradebook.interface';

@Component({
  selector: 'app-personal-gradebook',
  templateUrl: './personal-gradebook.component.html',
  styleUrls: ['./personal-gradebook.component.scss'],
  animations: [FadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalGradebookComponent implements OnInit {
  // errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() displayPersonalGradebook = new EventEmitter();
  @Input() personalGradebook$: BehaviorSubject<IRecord[]> = new BehaviorSubject(
    [] as IRecord[]
  );
  @Input() loggedUser : ILoggedUSer | null = {} as ILoggedUSer;

  constructor() {}
@Input() gpa: number | null = null;
  ngOnInit(): void {}
  public onClose(): void {
    this.displayPersonalGradebook.next(false);
  }
}
