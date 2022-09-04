import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISubject, ISubjectForm } from '../interfaces/subject.interface';
import { SubjectService } from '../services/subject.service';
import { BehaviorSubject, catchError, debounceTime, of, tap } from 'rxjs';
@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSubjectComponent implements OnInit {
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

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {}

  public onAddSubject(): void {
    this.subjectService
      .addSubject(this.subjectFrom.value as ISubject)
      .pipe(
        tap((v) => {
          this.subjectFrom.reset();
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
}
