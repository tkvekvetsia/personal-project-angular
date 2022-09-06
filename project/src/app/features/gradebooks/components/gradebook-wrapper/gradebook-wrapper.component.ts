import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ISubject } from 'src/app/features/subjects/interfaces/subject.interface';
import { SubjectService } from 'src/app/features/subjects/services/subject.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { GpaService } from 'src/app/shared/services/gpa.service';
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
  gradebooks$: BehaviorSubject<IRecord[]> = new BehaviorSubject(
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
  showPersonalGradebook$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  personalGradebook$: BehaviorSubject<IRecord[]> = new BehaviorSubject(
    [] as IRecord[]
  );
  gpa$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private backendService: BackendService,
    private subjectService: SubjectService,
    private authService: AuthService,
    private gradebookService: GradebookService,
    private gpaService: GpaService
  ) {}
  private getPersonalGradebook(idNumber: number): void {
    const gradebooks = this.gradebooks$.getValue();
    const arr = gradebooks.filter((v) => v.studentIdNumber === idNumber);
    this.personalGradebook$.next(arr);
  }

  ngOnInit(): void {

    //gpaService variables
    this.gpa$ = this.gpaService.getGpa();
    //gradebookService
    this.gradebookService
      .getAllRecord()
      .pipe(
        tap((v) => {
          this.gradebooks$.next(v);
          if (this.loggedUser$.getValue().status === 'Student') {
            this.onClickIdNumber(this.loggedUser$.getValue().idNumber);
            this.showPersonalGradebook$.next(true);
          }
        })
      )
      .subscribe();
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
          this.gpa$.next(this.calculateGpa());
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
          this.gradebooks$.next([...this.gradebooks$.getValue(), v]);
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

  public onDisplayPersonalGradebook(value: boolean) {
    this.showPersonalGradebook$.next(value);
  }

  public onClickIdNumber(idNumber: number) {
    this.getPersonalGradebook(idNumber);
    this.gpa$.next(this.calculateGpa());
    // console.log(this.personalGradebook$.getValue());
  }

  public calculateGpa(): number {
    const subjects: Array<string> = this.arrOfSubject$
      .getValue()
      .map((v) => v.subject);
    if (this.personalGradebook$.getValue().length) {
      return this.gpaService.gpaCalculator(
        subjects,
        this.personalGradebook$.getValue()
      );
    }
    return 0;
  }
}
