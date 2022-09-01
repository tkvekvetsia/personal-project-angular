import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit {
  teachers$: BehaviorSubject<IRegisteredUser[]> = new BehaviorSubject(
    [] as IRegisteredUser[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private backendService: BackendService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.backendService
      .getAllUsers()
      .pipe(
        tap((v) => {
          const arr = v.filter((value) => value.status === 'Teacher');
          this.teachers$.next(arr);
          this.errorMessage$.next(false);
          // console.log(this.teachers$.getValue());
        }),
        catchError((v) => {
          this.errorMessage$.next(true);
          return of(null);
        })
      )
      .subscribe();

    //authService variables
    this.isAdmin$ = this.authService.getIsAdmin();
  }
}
