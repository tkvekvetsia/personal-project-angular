import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

import { AuthGuard } from './core/guards/auth.guard';
import { LoginAndRegisterGuard } from './core/guards/login-and-register.guard';
import { RegisterComponent } from './shared/components/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginAndRegisterGuard]
  },
  {
    path:'register',
    component: RegisterComponent,
    canActivate: [LoginAndRegisterGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canLoad: [AuthGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
