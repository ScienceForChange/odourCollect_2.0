import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { GamingModalComponent } from './gaming-modal/gaming-modal.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';



@NgModule({
  declarations: [
    DialogModalComponent,
    InfoModalComponent,
    RegisterModalComponent,
    GamingModalComponent,
  ],
  imports: [
    NgComponentOutlet,
    CommonModule,
    AppRoutingModule,
    SharedComponentsModule
  ]
})
export class ModalsModule { }
