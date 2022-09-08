import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FadeAnimation } from 'src/app/shared/animations/animations';
import { ISubject, ISubjectForm } from '../../interfaces/subject.interface';
import { SubjectService } from '../../services/subject.service';
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
  animations:[FadeAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSubjectComponent implements OnInit {
  @Output() subject = new EventEmitter<ISubject>();
  @Output() addState = new EventEmitter<boolean>();

  subjectFrom: FormGroup<ISubjectForm> = new FormGroup({
    subject: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lessons: new FormControl<number | null>(null, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  constructor() {}

  ngOnInit(): void {}

  public onAddSubject(): void {
    this.subject.emit(this.subjectFrom.value as ISubject);
    this.subjectFrom.reset();
  }

  public onCancel(): void {
    this.addState.emit(false);
  }
}
