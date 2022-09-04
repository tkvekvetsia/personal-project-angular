import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports:[RegisterComponent, MatButtonModule, ReactiveFormsModule]
})
export class SharedModule { }
