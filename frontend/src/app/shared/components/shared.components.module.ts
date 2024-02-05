import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from './Icons/icons.module';
import { BackBtnComponent } from './back-btn/back-btn.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AccordionComponent } from './accordion/accordion.component';
import {
  NgbAccordionModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { FormErrorListComponent } from './form-error-list/form-error-list.component';
import { OdourTypeIconComponent } from './odour-type-icon/odour-type-icon.component';
import { SingleRangeComponent } from './form/single-range/single-range.component';
import { MultiRangeComponent } from './form/multi-range/multi-range.component';
import { DateRangeComponent } from './form/date-range/date-range.component';
import { FormsModule } from '@angular/forms';
import { AccordionMapFilterComponent } from './accordion-map-filter/accordion-map-filter.component';

@NgModule({
  declarations: [
    BackBtnComponent,
    SpinnerComponent,
    AccordionComponent,
    AlertComponent,
    FormErrorListComponent,
    OdourTypeIconComponent,
    SingleRangeComponent,
    MultiRangeComponent,
    DateRangeComponent,
    AccordionMapFilterComponent
  ],
  exports: [
    IconModule,
    BackBtnComponent,
    SpinnerComponent,
    AccordionComponent,
    AlertComponent,
    FormErrorListComponent,
    OdourTypeIconComponent,
    SingleRangeComponent,
    MultiRangeComponent,
    DateRangeComponent,
    AccordionMapFilterComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IconModule,
    NgbAccordionModule,
    NgbDatepickerModule,
    FormsModule,
    JsonPipe,
  ],
})
export class SharedComponentsModule {}
