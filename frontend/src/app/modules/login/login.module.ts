import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login.component';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';


@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    RouterModule
  ]
})
export class LoginModule { }
