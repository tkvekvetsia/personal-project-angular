import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  of,
  tap,
} from 'rxjs';
import {
  IFullNameFormGroup,
  IRegisteredUser,
  IRegisterForm,
} from 'src/app/shared/itnerfaces/register.interface';
import { BackendService } from '../../services/backend.service';
import { matchValidator } from './validators/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  passwordMatchError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  emailExistsError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  idExistsError$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
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
          if(this.email.valid){
            this.backendService
            .getAllUsers()
            .pipe(
              tap((v) => {
                let index = v.findIndex(
                  (data) => data.email === this.email.value
                );
                if (index < 0) {
                  this.emailExistsError$.next(false);
                } else {
                  this.emailExistsError$.next(true);
                }
              })
            )
            .subscribe();
          }
          
        })
      )
      .subscribe();

      //id number checking
      this.idNumber.valueChanges
      .pipe(
        debounceTime(100),
        tap(() => {
          if(this.idNumber.valid){
            this.backendService
            .getAllUsers()
            .pipe(
              tap((v) => {
                let index = v.findIndex(
                  (data) => data.idNumber === this.idNumber.value
                );
                if (index < 0) {
                  this.idExistsError$.next(false);
                } else {
                  this.idExistsError$.next(true);
                }
              })
            )
            .subscribe();
          }
          
        })
      )
      .subscribe();
        

  }

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
        Validators.minLength(11),
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
    status: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

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
        tap(() => {
          this.registerForm.reset();
          this.router.navigateByUrl('/login');
        }),
        catchError((e) => {
          alert(`Something Went Wrong With Status Code: ${e.status} ${e.statusText}`)
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

  fill() {
    this.registerForm.patchValue({
      fullName: {
        firstName: 'name',
        lastName: 'lastname',
      },
      idNumber: 12345678911,
      email: 'test@gmail.com',
      passwordGroup: {
        password: '123456789',
        confirmPassword: '123456789',
      },
      phoneNumber: 995598423645,
    });
  }
}
