import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import {
  IRecordForm,
  IRecord,
} from 'src/app/features/gradebooks/interfaces/gradebook.interface';
import { ISubject } from 'src/app/features/subjects/interfaces/subject.interface';
import { FadeAnimation } from 'src/app/shared/animations/animations';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';

@Component({
  selector: 'app-add-gradebook',
  templateUrl: './add-gradebook.component.html',
  styleUrls: ['./add-gradebook.component.scss'],
  animations: [FadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGradebookComponent implements OnInit {
 

  // @Input() arrOfSubject$: BehaviorSubject<ISubject[]> = new BehaviorSubject(
  //   [] as ISubject[]
  // );
  // @Input() loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
  //   {} as ILoggedUSer
  // );
 

  //change behavior subjects
  @Input() gradebook: IRecord = {} as IRecord;
  @Input() arrOfSubject: ISubject[] | null = [];
  @Input() student: ILoggedUSer | null =  {} as ILoggedUSer;
  @Input() loggedUser : ILoggedUSer | null = {} as ILoggedUSer;

  @Output() cancel = new EventEmitter();
  @Output() record = new EventEmitter();

  recordForm: FormGroup<IRecordForm> = new FormGroup({
    subject: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lesson: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    mark: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/\b([0-9]|10)\b/)],
    }),
  });
  constructor() {}
  private formatDate() {
    let date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
  }
  ngOnInit(): void {}

  public addRecord(): void {
    const student: string =
      this.student?.fullName.firstName +
      ' ' +
      this.student?.fullName.lastName;
    const teacher: string =
      this.loggedUser?.fullName.firstName +
      ' ' +
      this.loggedUser?.fullName.lastName;
    const today = this.formatDate();
    const recordValue: IRecord = {
      student: student,
      studentIdNumber: this.student?.idNumber as number,
      teacher: teacher,
      subject: this.subject.value as string,
      lesson: this.lesson.value as number,
      mark: this.mark.value as number,
      date: today,
    };

    this.record.emit(recordValue);
  }

  public onCancel(): void {
    this.cancel.emit();
  }

  // getters
  get subject(): FormControl<string> {
    return this.recordForm.get('subject') as FormControl<string>;
  }

  get lesson(): FormControl<number> {
    return this.recordForm.get('lesson') as FormControl<number>;
  }

  get mark(): FormControl<number> {
    return this.recordForm.get('mark') as FormControl<number>;
  }
}
