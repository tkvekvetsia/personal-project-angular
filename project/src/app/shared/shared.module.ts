import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmComponent } from './components/confirm/confirm.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'




@NgModule({
  declarations: [RegisterComponent, ConfirmComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports:[RegisterComponent, MatButtonModule, ReactiveFormsModule,MatIconModule, ConfirmComponent]
})
export class SharedModule { }
