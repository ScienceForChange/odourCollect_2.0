import { NgModule } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import { InfoModalComponent } from './info-modal/info-modal.component';



@NgModule({
  declarations: [
    DialogModalComponent,
    InfoModalComponent,
  ],
  imports: [
    NgComponentOutlet,
    CommonModule,
  ]
})
export class ModalsModule { }
