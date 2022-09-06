import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject,  } from 'rxjs';
import {
  IRecordForm,
  IRecord,
} from 'src/app/features/gradebooks/interfaces/gradebook.interface';
import { ISubject } from 'src/app/features/subjects/interfaces/subject.interface';
import { ILoggedUSer } from 'src/app/shared/itnerfaces/login.interface';

@Component({
  selector: 'app-add-gradebook',
  templateUrl: './add-gradebook.component.html',
  styleUrls: ['./add-gradebook.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGradebookComponent implements OnInit {
  @Input() gradebook$: BehaviorSubject<IRecord> = new BehaviorSubject(
    {} as IRecord
  );
  @Input() student$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject(
    {} as ILoggedUSer
  );
  @Input() arrOfSubject$: BehaviorSubject<ISubject[]> = new BehaviorSubject([] as ISubject[]);
  @Input() loggedUser$: BehaviorSubject<ILoggedUSer> = new BehaviorSubject({} as ILoggedUSer);

  @Output() cancel =  new EventEmitter();
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
      validators: [Validators.required],
    }),
  });
  constructor() {}
  private formatDate(){
    let date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); 
    const yyyy = date.getFullYear();
    return  mm + '/' + dd + '/' + yyyy;
  }
  ngOnInit(): void {}

  public addRecord(): void{
    const student: string = this.student$.getValue().fullName.firstName + " " + this.student$.getValue().fullName.lastName;
    const teacher: string = this.loggedUser$.getValue().fullName.firstName + " " +this.loggedUser$.getValue().fullName.lastName
    const today = this.formatDate();
    const recordValue: IRecord ={
      student: student,
      studentIdNumber: this.student$.getValue().idNumber,
      teacher: teacher,
      subject: this.subject.value as string,
      lesson: this.lesson.value as number,
      mark: this.mark.value as number,
      date: today
    } 

    this.record.emit(recordValue);
    
  }

  public onCancel(): void {
    this.cancel.emit();
  }


  // getters
  get subject(): FormControl<string>{
    return this.recordForm.get('subject') as FormControl<string>
  }

  get lesson(): FormControl<number>{
    return this.recordForm.get('lesson') as FormControl<number>
  }

  get mark(): FormControl<number>{
    return this.recordForm.get('mark') as FormControl<number>
  }

}
