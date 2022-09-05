import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ISubject } from 'src/app/features/subjects/interfaces/subject.interface';
import { SubjectService } from 'src/app/features/subjects/services/subject.service';
import {
  ILoggedUSer,
  ILoginResponse,
} from 'src/app/shared/itnerfaces/login.interface';
import { IRecord } from '../../interfaces/gradebook.interface';
import { GradebookService } from '../../services/gradebook.service';

@Component({
  selector: 'app-gradebook-wrapper',
  templateUrl: './gradebook-wrapper.component.html',
  styleUrls: ['./gradebook-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradebookWrapperComponent implements OnInit {
  arrOfStudents$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  arrOfGradebooks$: BehaviorSubject<IRecord[]> = new BehaviorSubject(
    [] as IRecord[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  student$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    {} as ILoggedUSer
  );
  arrOfSubject$: BehaviorSubject<ISubject[]> = new BehaviorSubject(
    [] as ISubject[]
  );
  loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    {} as ILoggedUSer
  );

  constructor(
    private backendService: BackendService,
    private subjectService: SubjectService,
    private authService: AuthService,
    private gradebookService: GradebookService
  ) {}

  ngOnInit(): void {
    //backendService variables
    this.backendService
      .getSpecificUsers('Student')
      .pipe(
        tap((v) => {
          this.arrOfStudents$.next(v);
          this.errorMessage$.next(false);
        }),
        catchError(() => {
          this.errorMessage$.next(true);
          return of(null);
        })
      )
      .subscribe();
    //subjectservice variables
    this.subjectService
      .getAllSubject()
      .pipe(
        tap((v) => {
          this.arrOfSubject$.next(v);
        })
      )
      .subscribe();

    //authService: variables
    this.loggedUser$ = this.authService.getLoggedUser();
  }

  public onAdd(value: ILoggedUSer): void {
    this.addState$.next(true);
    this.student$.next(value);
  }

  public registerRecord(value: IRecord): void {
    this.gradebookService
      .registerRecord(value)
      .pipe(
        tap((v) => {
          this.addState$.next(false);
          this.student$.next({} as ILoggedUSer);
          alert('Record Added Successfully');
        }),
        catchError((e) => {
          alert(
            `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
          );
          return of(null);
        })
      )
      .subscribe();
  }
  public onCancel(): void {
    this.addState$.next(false);
  }
}
