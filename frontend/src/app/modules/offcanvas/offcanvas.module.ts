import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicProfileOffcanvasComponent } from './components/public-profile-offcanvas/public-profile-offcanvas.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { InfoObservationOffcanvasComponent } from './components/info-observation-offcanvas/info-observation-offcanvas.component';
import { CommentsOffcanvasComponent } from './components/comments-offcanvas/comments-offcanvas.component';
import { ObservationFiltersOffCanvasComponent } from './components/observation-filters-offcanvas/observation-filters-offcanvas.component';
import { MenuOffcanvasComponent } from './components/menu-offcanvas/menu-offcanvas.component';
import { FiltersMyOdoursOffcanvasComponent } from './components/filters-my-odours-offcanvas/filters-my-odours-offcanvas.component';

@NgModule({
  declarations: [
    CommentsOffcanvasComponent,
    FiltersMyOdoursOffcanvasComponent,
    InfoObservationOffcanvasComponent,
    MenuOffcanvasComponent,
    ObservationFiltersOffCanvasComponent,
    PublicProfileOffcanvasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedComponentsModule,
  ],
})
export class OffcanvasModule {}
