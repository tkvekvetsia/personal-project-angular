import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './components/students/students.component';
import { AdminsComponent } from './components/admins/admins.component';
import { UsersRoutingModule } from './users-routing.module';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    StudentsComponent,
    AdminsComponent,
    TeachersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ]
})
export class UsersModule { }
