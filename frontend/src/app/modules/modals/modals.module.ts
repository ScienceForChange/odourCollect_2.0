import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GamingModalComponent } from './gaming-modal/gaming-modal.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { CompleteProfileModalComponent } from './complete-profile-modal/complete-profile-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DialogModalComponent,
    InfoModalComponent,
    RegisterModalComponent,
    GamingModalComponent,
    CompleteProfileModalComponent,
  ],
  imports: [
    NgComponentOutlet,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    SharedComponentsModule
  ]
})
export class ModalsModule { }
