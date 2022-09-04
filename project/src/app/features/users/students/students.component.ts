import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, filter, of, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent implements OnInit, OnDestroy {
  students$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addUser$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private backendService: BackendService,
    private atuhService: AuthService
  ) {}

  private getStudents(): void {
    this.backendService
      .getAllUsers()
      .pipe(
        tap((v) => {
          const arr = v.filter((value) => value.status === 'Student');
          this.students$.next(arr);
          this.errorMessage$.next(false);
          // console.log(this.students$.getValue());
        }),
        catchError((v) => {
          this.errorMessage$.next(true);
          return of(null);
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.getStudents();

    //atuhService variables
    this.isAdmin$ = this.atuhService.getIsAdmin();

    //backendService variables
    this.addUser$ = this.backendService.getAddUser();
    this.students$ = this.backendService.getStudents()
  }

  ngOnDestroy(): void {
    this.backendService.changeAddUser('');
  }

  public onDelete(id: number): void {
    this.backendService.deleteUser(id).pipe(
      tap(v=>{
        this.getStudents();
      }),
      catchError(
        (e) => {
          alert(
            `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
          );
          return of(null)
        }
      )      
    ).subscribe();

   

  }
  public onAddUser():void{
    this.backendService.changeAddUser("Student");
  }
}
