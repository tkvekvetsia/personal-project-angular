import { FormControl } from '@angular/forms';
import { IFullName } from './register.interface';

export interface ILoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface ILoginUser {
  email: string;
  password: string;
}

export interface ILoggedUSer {
  fullName: IFullName;
  idNumber: number;
  email: string;
  phoneNumber: number;
  dateOfBirth: string;
  sex: string;
  status: string;
  id: number;
  // accessToken: string;
}

export interface ILoginResponse {
  accessToken: string;
  user: ILoggedUSer
}
