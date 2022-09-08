import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';
import { AdminsComponent } from './components/admins/admins.component';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: 'teachers',
    pathMatch: 'full',
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    data: { num: 2 }

  },
 
  {
    path: 'students',
    component: StudentsComponent, 
    data: { num: 3 }

  },
  {
    path: 'admins',
    component: AdminsComponent,
    canActivate: [AdminGuard],
    data: { num: 4 }

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
