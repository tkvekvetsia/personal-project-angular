import { FormControl, FormGroup } from '@angular/forms';

export interface IFullNameFormGroup{
 
    firstName: FormControl<string>;
    lastName: FormControl<string>;
  
}
export interface IRegisterForm {
  fullName: FormGroup<IFullNameFormGroup>
  idNumber: FormControl<number | null>;
  email: FormControl<string>;
  passwordGroup: FormGroup<{
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;
  phoneNumber: FormControl<number | null>;
  dateOfBirth: FormControl<string>;
  sex: FormControl<string>;
  status: FormControl<string>;

}
