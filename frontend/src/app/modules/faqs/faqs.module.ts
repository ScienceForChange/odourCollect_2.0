import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreRoutingModule } from 'src/app/core/core-routing.module';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FaqsAboutOdoucollectComponent } from './components/faqs-about-odoucollect/faqs-about-odoucollect.component';
import { FaqsHowWorksComponent } from './components/faqs-how-works/faqs-how-works.component';
import { FaqsHelpComponent } from './components/faqs-help/faqs-help.component';
import { FaqsTechnicsComponent } from './components/faqs-technics/faqs-technics.component';

@NgModule({
  declarations: [FaqsComponent, FaqsAboutOdoucollectComponent, FaqsHowWorksComponent, FaqsHelpComponent, FaqsTechnicsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedComponentsModule,
    CoreRoutingModule,
    NgbAccordionModule,
  ],
})
export class FaqsModule {}
