import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, catchError, of, ReplaySubject, tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
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
  constructor(
    private authService: AuthService,
    private backendService: BackendService,
    private gpaService: GpaService
  ) {}

  ngOnInit(): void {
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
  }

  public onUpdate(id: number, email: string): void {
    this.backendService.changeUpdateUserId(id);
    this.backendService.changeLoggedUserEmail(email);
    this.backendService.changeUpdateState(true);
  }

  public onDelete(): void {
    this.backendService
      .deleteUser(this.loggedUser$.getValue().id)
      .pipe(
        tap((v) => {
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
      )
      .subscribe();
  }
}
