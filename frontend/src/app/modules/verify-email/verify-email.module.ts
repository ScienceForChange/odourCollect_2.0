import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

@NgModule({
  declarations: [
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule
  ],
  exports: [],
})
export class VerifyEmailModule {}
