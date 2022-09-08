import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  of,
  Subscription,
  tap,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BackendService } from 'src/app/core/services/backend.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import {
  IFullNameFormGroup,
  IRegisteredUser,
  IRegisterForm,
} from 'src/app/shared/itnerfaces/register.interface';
import { ILoggedUSer } from '../../itnerfaces/login.interface';

import { matchValidator } from './validators/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  passwordMatchError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  emailExistsError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  idExistsError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  updateState$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loggedUserEmail$: BehaviorSubject<string> = new BehaviorSubject('');
  loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    {} as ILoggedUSer
  );
  status$: BehaviorSubject<string> = new BehaviorSubject('');
  addUser$: BehaviorSubject<string> = new BehaviorSubject('');
  students$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  teachers$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject(
    [] as ILoggedUSer[]
  );
  users$: BehaviorSubject<ILoggedUSer[]> = new BehaviorSubject([] as ILoggedUSer[])
  subscription: Subscription = new Subscription();
  //register form
  registerForm: FormGroup<IRegisterForm> = new FormGroup({
    fullName: new FormGroup<IFullNameFormGroup>({
      firstName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      }),
      lastName: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      }),
    }),
    idNumber: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [
        // Validators.minLength(11),
        Validators.pattern(
          /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/
        ),
        Validators.required,
      ], //minlengt doesn't work for some misterious reason
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    passwordGroup: new FormGroup(
      {
        password: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(8)],
        }),
        confirmPassword: new FormControl<string>('', {
          nonNullable: true,
          validators: [Validators.required],
        }), //confirm password
      },
      [matchValidator('password', 'confirmPassword')]
    ),
    phoneNumber: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          /\+995[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/
        ),
        Validators.minLength(13),
        Validators.maxLength(13),
      ],
    }),
    dateOfBirth: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sex: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: new FormControl<string>('teacher', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor(
    private backendService: BackendService,
    private router: Router,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.backendService.getAllUsers().pipe(
      tap(v => {
        this.users$.next(v)
      })
    ).subscribe()
    //check for paswword match
    this.confirmPassword.valueChanges
      .pipe(
        tap(() => {
          if (
            this.password.value !== this.confirmPassword.value &&
            this.password.valid
          ) {
            this.passwordMatchError$.next(true);
          } else {
            this.passwordMatchError$.next(false);
          }
        })
      )
      .subscribe();

    this.password.valueChanges
      .pipe(
        tap(() => {
          if (
            this.password.value !== this.confirmPassword.value &&
            this.confirmPassword.valid
          ) {
            this.passwordMatchError$.next(true);
          } else {
            this.passwordMatchError$.next(false);
          }
        })
      )
      .subscribe();
    //end of checking passwords

    //check email
    this.email.valueChanges
      .pipe(
        debounceTime(100),
        tap(() => {
          if (this.email.valid) {
            let index = this.users$.getValue().findIndex(
              (data) => data.email === this.email.value
            );
            if (index < 0) {
              this.emailExistsError$.next(false);
            }else if(index >=0 && this.addUser$.getValue()){
              this.emailExistsError$.next(true);
            } else if (
              index >= 0 && 
              this.email.value !== this.loggedUser$.getValue()?.email
            ) {
              this.emailExistsError$.next(true);
            }
          }
        
        })
      )
      .subscribe();

    //id number checking
    this.idNumber.valueChanges
      .pipe(
        debounceTime(100),
        tap(() => {
          if (this.idNumber.valid) {
            let index = this.users$.getValue().findIndex(
              (data) => data.idNumber === this.idNumber.value
            );
            if (
              index < 0 ||
              this.idNumber.value === this.loggedUser$.getValue()?.idNumber
            ) {
              this.idExistsError$.next(false);
            }else if(index >=0 && this.addUser$.getValue()){
              this.idExistsError$.next(true);  
            } else if (
              index >= 0 &&
              this.idNumber.value !==
                this.loggedUser$.getValue()?.idNumber
            ) {
              this.idExistsError$.next(true);
             
            }
          }
         
        })
      )
      .subscribe();

    //update state

    //authService variables
    this.loggedUser$ = this.authService.getLoggedUser();

    //backend service variables
    this.updateState$ = this.backendService.getUpdateState();
    this.loggedUserEmail$ = this.backendService.getLoggedUserEmail();
    this.addUser$ = this.backendService.getAddUser();
    this.students$ = this.backendService.getStudents();
    this.teachers$ = this.backendService.getTeachers();

    //update
    this.subscription = this.updateState$
      .pipe(
        tap((v) => {
          if (v) {
            this.registerForm.patchValue({
              fullName: {
                firstName: this.loggedUser$.getValue().fullName.firstName,
                lastName: this.loggedUser$.getValue().fullName.lastName,
              },
              idNumber: this.loggedUser$.getValue().idNumber,
              email: this.loggedUser$.getValue().email,
              phoneNumber: this.loggedUser$.getValue().phoneNumber,
              dateOfBirth: this.loggedUser$.getValue().dateOfBirth,
              sex: this.loggedUser$.getValue().sex,

            });
          }
        })
      )
      .subscribe();
  }

  //register user
  public onRegister(): void {
    const user: IRegisteredUser = {
      fullName: {
        firstName: this.firstnName.value,
        lastName: this.lastName.value,
      },
      idNumber: this.idNumber.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: this.phoneNumber.value,
      dateOfBirth: this.dateOfBirth.value,
      sex: this.sex.value,
      status: this.status.value,
    };

    this.backendService
      .registerUser(user)
      .pipe(
        tap((v) => {
          // console.log(v);

          this.registerForm.reset();
          this.router.navigateByUrl('/login');
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

  //cancel update state
  public onCancel(): void {
    this.backendService.changeUpdateState(false);
    this.backendService.changeAddUser('');
  }

  //update user
  public onUpdate(): void {
    const user: IRegisteredUser = {
      fullName: {
        firstName: this.firstnName.value,
        lastName: this.lastName.value,
      },
      idNumber: this.idNumber.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: this.phoneNumber.value,
      dateOfBirth: this.dateOfBirth.value,
      sex: this.sex.value,
      status: this.loggedUser$.getValue().status,
    };
    this.backendService
      .updateUser(user)
      .pipe(
        tap((v) => {
          this.authService.changeLoggedUser(v);
          this.tokenStorageService.saveUser(v);
          this.registerForm.reset();
          this.backendService.changeUpdateState(false);
        }),
        catchError((e) => {
          // console.log(e);
          alert(
            `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
          );
          return of(null);
        })
      )
      .subscribe();
  }

  //add User
  public onAddUser(): void {
    const user: IRegisteredUser = {
      fullName: {
        firstName: this.firstnName.value,
        lastName: this.lastName.value,
      },
      idNumber: this.idNumber.value,
      email: this.email.value,
      password: this.password.value,
      phoneNumber: this.phoneNumber.value,
      dateOfBirth: this.dateOfBirth.value,
      sex: this.sex.value,
      status: this.addUser$.getValue(),
    };
    this.backendService
      .registerUser(user)
      .pipe(
        tap((v) => {
          // console.log(v),
          this.registerForm.reset();
          this.backendService.changeAddUser('');
          if (v.user.status === 'Student') {
            this.backendService.changeStudents([
              ...this.students$.getValue(),
              v.user,
            ]);
          } else if (v.user.status === 'Teacher') {
            this.backendService.changeTeachers([
              ...this.teachers$.getValue(),
              v.user,
            ]);
          }
        }),
        catchError((e) => {
          // console.log(e);
          alert(
            `Something Went Wrong With Status Code: ${e.status} ${e.statusText}`
          );
          return of(null);
        })
      )
      .subscribe();
  }

  //registerform getters
  get fullName(): FormGroup<IFullNameFormGroup> {
    return this.registerForm.get('fullName') as FormGroup<IFullNameFormGroup>;
  }

  get firstnName(): FormControl<string> {
    return this.registerForm.get('fullName.firstName') as FormControl<string>;
  }

  get lastName(): FormControl<string> {
    return this.registerForm.get('fullName.lastName') as FormControl<string>;
  }

  get idNumber(): FormControl<number> {
    return this.registerForm.get('idNumber') as FormControl<number>;
  }

  get email(): FormControl<string> {
    return this.registerForm.get('email') as FormControl<string>;
  }

  get passwordGroup() {
    return this.registerForm.get('passwordGroup');
  }

  get password(): FormControl<string> {
    return this.registerForm.get(
      'passwordGroup.password'
    ) as FormControl<string>;
  }
  get confirmPassword(): FormControl<string> {
    return this.registerForm.get(
      'passwordGroup.confirmPassword'
    ) as FormControl<string>;
  }

  get phoneNumber(): FormControl<number> {
    return this.registerForm.get('phoneNumber') as FormControl<number>;
  }

  get dateOfBirth(): FormControl<string> {
    return this.registerForm.get('dateOfBirth') as FormControl<string>;
  }
  get sex(): FormControl<string> {
    return this.registerForm.get('sex') as FormControl<string>;
  }
  get status(): FormControl<string> {
    return this.registerForm.get('status') as FormControl<string>;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
