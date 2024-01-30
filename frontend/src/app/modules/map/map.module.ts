import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { MapComponent } from './components/map/map.component';
import { CoreRoutingModule } from 'src/app/core/core-routing.module';
import { ObservationFiltersComponent } from './components/observation-filters/observation-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from './components/accordion/accordion-filter.component';
import { LastOdoursComponent } from './components/last-odours/last-odours.component';

@NgModule({
  declarations: [
    MapComponent,
    ObservationFiltersComponent,
    AccordionComponent,
    LastOdoursComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedComponentsModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbAccordionModule,
    NgbDatepickerModule,
  ],
})
export class MapModule {}
