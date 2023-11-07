import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { CheckEmailComponent } from './components/check-email/check-email.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [RecoverPasswordComponent, CheckEmailComponent],
  exports: [RecoverPasswordComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
  ]
})
export class RecoverPasswordModule { }
