import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicProfileOffcanvaComponent } from './components/public-profile-offcanva/public-profile-offcanva.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { InfoObservationOffcanvaComponent } from './components/info-observation-offcanva/info-observation-offcanva.component';
import { CommentsOffcanvaComponent } from './components/comments-offcanva/comments-offcanva.component';
import { ObservationFiltersOffCanvaComponent } from './components/observation-filters-offcanva/observation-filters-offcanva.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuOffcanvaComponent } from './components/menu-offcanva/menu-offcanva.component';


@NgModule({
  declarations: [
    ObservationFiltersOffCanvaComponent,
    PublicProfileOffcanvaComponent,
    InfoObservationOffcanvaComponent,
    CommentsOffcanvaComponent,
    MenuOffcanvaComponent,
  ],
  imports: [
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class OffcanvasModule { }
