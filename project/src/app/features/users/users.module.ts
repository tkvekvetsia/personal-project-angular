import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students/students.component';
import { AdminsComponent } from './admins/admins.component';
import { UsersRoutingModule } from './users-routing.module';
import { TeachersComponent } from './teachers/teachers.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    StudentsComponent,
    AdminsComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatIconModule
  ]
})
export class UsersModule { }
