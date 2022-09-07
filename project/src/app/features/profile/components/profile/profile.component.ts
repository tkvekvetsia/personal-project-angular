import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, catchError, of, ReplaySubject, Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { ConfirmService } from 'src/app/shared/services/confirm.service';
import { GpaService } from 'src/app/shared/services/gpa.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit, OnDestroy {
  loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    {} as ILoggedUSer
  );
  updateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedUserEmail$: BehaviorSubject<string> = new BehaviorSubject('');
  gpa$: BehaviorSubject<number> = new BehaviorSubject(0);
  number = 0;
  confirmValue$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
  remove = false;
  subscription: Subscription = new Subscription();
  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private gpaService: GpaService,
    private confirmService: ConfirmService

  ) {}

  ngOnInit(): void {
    //confirmService
    this.confirmValue$ = this.confirmService.getCofnirmValue();
    this.subscription = this.confirmValue$
    .pipe(
      tap(v =>{
        if(v){
          this.onDelete();
          
        }else{
          this.remove = false;
        }
      })
    )
    .subscribe()
    //gpaservice variables
    this.gpa$ = this.gpaService.getGpa();

    //auth service variables
    this.loggedUser$ = this.authService.getLoggedUser();

    //backend service variables
    this.updateState$ = this.backendService.getUpdateState();
    this.loggedUserEmail$ = this.backendService.getLoggedUserEmail();
  }

  ngOnDestroy(): void {
    this.backendService.changeUpdateState(false);
    this.subscription.unsubscribe();
  }

  public onUpdate(id: number, email: string): void {
    this.backendService.changeUpdateUserId(id);
    this.backendService.changeLoggedUserEmail(email);
    this.backendService.changeUpdateState(true);
  }

  
  public onRemove(): void{
    this.remove = true;
  }

  public onDelete(): void {
    this.backendService
      .deleteUser(this.loggedUser$.getValue().id)
      .pipe(
        tap((v) => {
          // console.log(v);
          this.remove = false;
          this.confirmService.changeConfirmValue(false);
          this.authService.logOut();
        }),
        catchError((e) => {
          console.log(e);
          alert(
            `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
          );
          this.remove = false;
          this.confirmService.changeConfirmValue(false);
          return of(null);
        })
      )
      .subscribe();
  }
}
