import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';


@Component({
  selector: 'app-gradebook-list',
  templateUrl: './gradebook-list.component.html',
  styleUrls: ['./gradebook-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradebookListComponent implements OnInit {
  @Input()  students$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  @Input() errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output() addGradebook = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  public onAdd():void{
    this.addGradebook.emit(true);
  }
}
