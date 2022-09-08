import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, catchError, filter, of, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import {
  trigger,
  style,
  transition,
  animate,
  state,
} from '@angular/animations';
import { FadeAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  animations:[FadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent implements OnInit, OnDestroy {
  students$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  addUser$: BehaviorSubject<string> = new BehaviorSubject('');
  confirmValue$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  remove = false;
  subscription: Subscription = new Subscription();
  private deleteId: number = NaN;
  constructor(
    private backendService: BackendService,
    private atuhService: AuthService,
    private confirmService: ConfirmService
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
    this.students$ = this.backendService.getStudents();

    //confirmservice
    this.confirmValue$ = this.confirmService.getCofnirmValue();
    this.subscription = this.confirmValue$
    .pipe(
      tap(v =>{
        if(v){
          this.onDelete(this.deleteId);
        }else{
          this.deleteId = NaN;
          this.remove = false;
        }
      })
    )
    .subscribe()

  }



  public onRemove(id: number): void{
    this.deleteId = id;
    this.remove = true;
  }

  public onDelete(id: number): void {
    this.backendService
      .deleteUser(id)
      .pipe(
        tap((v) => {
          this.getStudents();
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
        }),
        

      )
      .subscribe();
  }
  public onAddUser(): void {
    this.backendService.changeAddUser('Student');
  }
  ngOnDestroy(): void {
    this.backendService.changeAddUser('');
    this.subscription.unsubscribe();
  }

    
  
}
