import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, ReplaySubject, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject({} as ILoggedUSer);
  updateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedUserEmail$: BehaviorSubject<string> =new BehaviorSubject('')

  constructor(
    private authService: AuthService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    //auth service variables
    this.loggedUser$ = this.authService.getLoggedUser();

    //backend service variables
    this.updateState$ = this.backendService.getUpdateState();
    this.loggedUserEmail$ = this.backendService.getLoggedUserEmail();

    
  }

  public onUpdate(id: number, email:string): void {
    this.backendService.changeUpdateUserId(id);
    this.backendService.changeLoggedUserEmail(email)
    this.backendService.changeUpdateState(true);
  }

  public onDelete(): void{
    this.backendService.deleteUser(this.loggedUser$.getValue().id).pipe(
      tap( v => {
        console.log(v);
        this.authService.logOut();
      }),
      catchError((e) => {
        console.log(e);
        alert(
          `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
        );
        return of(null);
      })
    ).subscribe();
    
  }
}
