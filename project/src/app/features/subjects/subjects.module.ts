import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './subjects.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SubjectsComponent,
    AddSubjectComponent,
    SubjectListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path:'',
        component: SubjectsComponent
      }
    ])
  ]
})
export class SubjectsModule { }
