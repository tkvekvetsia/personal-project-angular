import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

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

  constructor(
    private backendService: BackendService,
    private authService: AuthService
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
    this.getTeachers();

    //authService variables
    this.isAdmin$ = this.authService.getIsAdmin();

    //backendService variables
    this.addUser$ = this.backendService.getAddUser();
    this.teachers$ = this.backendService.getTeachers();
  }

  public onDelete(id: number): void {
    this.backendService
      .deleteUser(id)
      .pipe(
        tap((v) => {
          this.getTeachers();
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

  public onAddUser(): void {
    this.backendService.changeAddUser('Teacher');
  }

  ngOnDestroy(): void {
    this.backendService.changeAddUser('');
  }
}
