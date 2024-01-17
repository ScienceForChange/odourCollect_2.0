import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicProfileOffcanvaComponent } from './components/public-profile-offcanva/public-profile-offcanva.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { InfoObservationOffcanvaComponent } from './components/info-observation-offcanva/info-observation-offcanva.component';
import { CommentsOffcanvaComponent } from './components/comments-offcanva/comments-offcanva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PublicProfileOffcanvaComponent,
    InfoObservationOffcanvaComponent,
    CommentsOffcanvaComponent
  ],
  imports: [
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class OffcanvasModule { }
