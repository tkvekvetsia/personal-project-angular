import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students/students.component';
import { AdminsComponent } from './admins/admins.component';
import { UsersRoutingModule } from './users-routing.module';
import { TeachersComponent } from './teachers/teachers.component';
import {MatTableModule} from '@angular/material/table';



@NgModule({
  declarations: [
    StudentsComponent,
    AdminsComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule
  ]
})
export class UsersModule { }
