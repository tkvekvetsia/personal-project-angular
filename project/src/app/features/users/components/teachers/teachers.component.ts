import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, catchError, of, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';
import { ConfirmService } from 'src/app/shared/services/confirm.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addUser$: BehaviorSubject<string> = new BehaviorSubject('');
  confirmValue$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  remove = false;
  deleteId: number = NaN;
  subscription: Subscription = new Subscription();

  constructor(
    private backendService: BackendService,
    private authService: AuthService,
    private confirmService: ConfirmService
  ) {}

  private getTeachers(): void {
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
  }

  ngOnInit(): void {
    //confirmService
    this.confirmValue$ = this.confirmService.getCofnirmValue();
    this.subscription = this.confirmValue$
      .pipe(
        tap((v) => {
          if (v) {
            this.onDelete(this.deleteId);
            console.log('subed');
            
          } else {
            console.log('subed');
            this.deleteId = NaN;
            this.remove = false;
          }
        })
      )
      .subscribe();

    //
    this.getTeachers();

    //authService variables
    this.isAdmin$ = this.authService.getIsAdmin();

    //backendService variables
    this.addUser$ = this.backendService.getAddUser();
    this.teachers$ = this.backendService.getTeachers();
  }

  public onRemove(id: number): void {
    this.remove = true;
    this.deleteId = id;
  }

  public onDelete(id: number): void {
    this.backendService
      .deleteUser(id)
      .pipe(
        tap((v) => {
          this.getTeachers();
          this.deleteId = NaN;
          this.remove = false;
          this.confirmService.changeConfirmValue(false);
        }),
        catchError((e) => {
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

  public onAddUser(): void {
    this.backendService.changeAddUser('Teacher');
  }

  ngOnDestroy(): void {
    this.backendService.changeAddUser('');
    this.subscription.unsubscribe();
  }
}
