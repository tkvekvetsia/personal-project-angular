import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { BackendService } from 'src/app/core/services/backend.service';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';
import { IRegisteredUser } from 'src/app/shared/itnerfaces/register.interface';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminsComponent implements OnInit {
  admins$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  errorMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService
      .getAllUsers()
      .pipe(
        tap((v) => {
          const arr = v.filter((value) => value.status === 'Admin');
          console.log(v);
          this.admins$.next(arr);
          this.errorMessage$.next(false);
          // console.log(this.admins$.getValue());
        }),
        catchError((v) => {
          this.errorMessage$.next(true);
          return of(null);
        })
      )
      .subscribe();
  }
}
