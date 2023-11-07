import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { RecoverCreatePasswordComponent } from './components/recover-create-password/recover-create-password.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RecoverCreatePasswordComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    RouterModule
  ]
})
export class RecoverCreatePasswordModule { }
