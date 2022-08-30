import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime, tap } from 'rxjs';
import { IFullNameFormGroup, IRegisterForm } from 'src/app/shared/itnerfaces/register.interface';
import { matchValidator } from './validators/password.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  passwordMatchError: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  ngOnInit(): void {
    //check for paswword match
    this.confirmPassword.valueChanges
      .pipe(
        tap(() => {
          if (
            this.password.value !== this.confirmPassword.value &&
            this.password.valid
          ) {
            this.passwordMatchError.next(true);
          } else {
            this.passwordMatchError.next(false);
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
            this.passwordMatchError.next(true);
          } else {
            this.passwordMatchError.next(false);
          }
        })
      )
      .subscribe();

    //end of checking passwords
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
        Validators.maxLength(11),
        Validators.pattern(
          /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/
        ),
        Validators.required,
      ], //maxLength doesn't work for some misterious reason
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
}
