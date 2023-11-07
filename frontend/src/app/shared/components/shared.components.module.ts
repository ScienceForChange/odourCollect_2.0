import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from './Icons/icons.module';
import { BackBtnComponent } from './back-btn/back-btn.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { AccordionComponent } from './accordion/accordion.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './alert/alert.component';
import { FormErrorListComponent } from './form-error-list/form-error-list.component';
import { OdourTypeIconComponent } from './odour-type-icon/odour-type-icon.component';
import { SingleRangeComponent } from './form/single-range/single-range.component';
import { MultiRangeComponent } from './form/multi-range/multi-range.component';
import { BottomModalComponent } from './bottom-modal/bottom-modal.component';

@NgModule({
  declarations: [
    BackBtnComponent,
    BottomModalComponent,
    SpinnerComponent,
    AccordionComponent,
    AlertComponent,
    FormErrorListComponent,
    OdourTypeIconComponent,
    SingleRangeComponent,
    MultiRangeComponent,
  ],
  exports: [
    IconModule,
    BackBtnComponent,
    BottomModalComponent,
    SpinnerComponent,
    AccordionComponent,
    AlertComponent,
    FormErrorListComponent,
    OdourTypeIconComponent,
    SingleRangeComponent,
    MultiRangeComponent,
  ],
  imports: [CommonModule, HttpClientModule, IconModule, NgbAccordionModule],
})
export class SharedComponentsModule {}
