import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SubjectService } from '../services/subject.service';
import {
  BehaviorSubject,
  catchError,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { ISubject } from '../interfaces/subject.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubjectsComponent implements OnInit, OnDestroy {
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subjects$: BehaviorSubject<ISubject[]> = new BehaviorSubject(
    [] as ISubject[]
  );
  user$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject({} as ILoggedUSer);
  confirmValue$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  remove = false;
  deleteId = NaN;
  subscription: Subscription = new Subscription();
  constructor(
    private subjectService: SubjectService,
    private authService: AuthService,
    private confirmService: ConfirmService
  ) {}

  private getAllSubject(): void {
    this.subjectService
      .getAllSubject()
      .pipe(
        tap((v) => {
          this.subjects$.next(v);
        }),
        catchError(() => {
          this.errorMessage$.next(true);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    //confirservice
    this.confirmValue$ = this.confirmService.getCofnirmValue();
    this.subscription = this.confirmValue$
      .pipe(
        tap((v) => {
          if (v) {
            this.onDeleteSubject(this.deleteId);
          } else {
            this.deleteId = NaN;
            this.remove = false;
          }
        })
      )
      .subscribe();

    this.getAllSubject();
    this.user$ = this.authService.getLoggedUser();
  }

  public onRemove(id: number): void {
    this.deleteId = id;
    this.remove = true;
  }

  public addSubject(subject: ISubject): void {
    this.subjectService
      .addSubject(subject)
      .pipe(
        tap((v) => {
          this.addState$.next(false);
          this.subjects$.next([...this.subjects$.getValue(), v]);
          this.deleteId = NaN;
          this.remove = false;
          this.confirmService.changeConfirmValue(false);
          alert('Added successfully');
        }),
        catchError((e) => {
          // console.log(e);
          alert(
            `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
          );
          this.deleteId = NaN;
          this.remove = false;
          this.confirmService.changeConfirmValue(false);
          return of(null);
        })
      )
      .subscribe();
  }

  onChangeAddState(value: boolean) {
    this.addState$.next(value);
  }

  public onDeleteSubject(id: number): void {
    this.subjectService
      .deleteSubject(id)
      .pipe(
        tap((v) => {
          // console.log(v);
          this.getAllSubject();
          this.deleteId = NaN;
          this.remove = false;
          this.confirmService.changeConfirmValue(false);
        }),
        catchError((e) => {
          this.deleteId = NaN;
          this.remove = false;
          this.confirmService.changeConfirmValue(false);
          alert(
            `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
          );      
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
