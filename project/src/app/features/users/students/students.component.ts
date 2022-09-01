import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, filter, of, tap } from 'rxjs';
import { BackendService } from 'src/app/core/services/backend.service';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent implements OnInit {
  students$: BehaviorSubject<IRegisteredUser[]> = new BehaviorSubject(
    [] as IRegisteredUser[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService
      .getAllUsers()
      .pipe(
        tap((v) => {
          const arr = v.filter((value) => value.status === 'Student');
          this.students$.next(arr);
          this.errorMessage$.next(false);
          console.log(this.students$.getValue());
        }),
        catchError((v) => {
          this.errorMessage$.next(true);
          return of(null);
        })
      )
      .subscribe();
  }
}
