import { FormControl } from '@angular/forms';

export interface IRecord {
  student: string;
  studentIdNumber: number;
  teacher: string;
  subject: string;
  lesson: number;
  mark: number;
  date: string;
  id?: number;
}

export interface IRecordForm {
  subject: FormControl<string>;
  lesson: FormControl<number | null>;
  mark: FormControl<number | null>;
}
