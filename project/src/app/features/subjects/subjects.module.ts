import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectListComponent } from './subject-list/subject-list.component';



@NgModule({
  declarations: [
    SubjectsComponent,
    AddSubjectComponent,
    SubjectListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SubjectsModule { }
