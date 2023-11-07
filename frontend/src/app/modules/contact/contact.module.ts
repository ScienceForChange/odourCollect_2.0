import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './components/contact/contact.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, SharedComponentsModule, ReactiveFormsModule],
})
export class ContactModule {}
