import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    MatButtonModule,
    
    
  ]
})
export class ProfileModule { }
