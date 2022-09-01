import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { TeachersComponent } from './teachers/teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { AdminsComponent } from './admins/admins.component';



@NgModule({
  declarations: [
    UsersComponent,
    TeachersComponent,
    StudentsComponent,
    AdminsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
