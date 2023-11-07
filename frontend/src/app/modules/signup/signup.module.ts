import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './components/signup/signup.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';

@NgModule({
  declarations: [SignupComponent, ActivateAccountComponent],
  exports: [SignupComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SignupRoutingModule,
    SharedComponentsModule,
  ],
})
export class SignupModule {}
