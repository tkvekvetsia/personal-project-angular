import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { IRecord } from '../../interfaces/gradebook.interface';

@Component({
  selector: 'app-personal-gradebook',
  templateUrl: './personal-gradebook.component.html',
  styleUrls: ['./personal-gradebook.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalGradebookComponent implements OnInit {
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() displayPersonalGradebook = new EventEmitter();
  @Input() personalGradebook$: BehaviorSubject<IRecord[]> = new BehaviorSubject(
    [] as IRecord[]
  );
  @Input() loggedUser$: BehaviorSubject<ILoggedUSer>= new BehaviorSubject({} as ILoggedUSer);
  constructor() {}

  ngOnInit(): void {}
  public onClose(): void {
    this.displayPersonalGradebook.next(false);
  }
}
