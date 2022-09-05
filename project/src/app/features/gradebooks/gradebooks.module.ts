import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradebookListComponent } from './components/gradebook-list/gradebook-list.component';
import { PersonalGradebookComponent } from './components/personal-gradebook/personal-gradebook.component';
import { AddGradebookComponent } from './components/add-gradebook/add-gradebook.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { GradebookWrapperComponent } from './components/gradebook-wrapper/gradebook-wrapper.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    GradebookListComponent,
    PersonalGradebookComponent,
    AddGradebookComponent,
    GradebookWrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: GradebookWrapperComponent
      }
    ])
  ]
})
export class GradebooksModule { }
