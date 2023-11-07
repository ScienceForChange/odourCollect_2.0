import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { MapComponent } from './components/map/map.component';
import { CoreRoutingModule } from 'src/app/core/core-routing.module';
import { ObservationFiltersComponent } from './components/observation-filters/observation-filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OdourInformationComponent } from './components/odour-information/odour-information.component';
import {
  NgbAccordionModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AccordionComponent } from './components/accordion/accordion-filter.component';

@NgModule({
  declarations: [
    MapComponent,
    ObservationFiltersComponent,
    OdourInformationComponent,
    AccordionComponent,
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
  ],
})
export class MapModule {}
