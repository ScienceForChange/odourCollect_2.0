import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicProfileOffcanvaComponent } from './components/public-profile-offcanva/public-profile-offcanva.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';



@NgModule({
  declarations: [
    PublicProfileOffcanvaComponent
  ],
  imports: [
    SharedComponentsModule,
    CommonModule
  ]
})
export class OffcanvasModule { }
