import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsComponent } from './faqs.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FaqsTechnicsComponent } from '../faqs-technics/faqs-technics.component';
import { FaqsHelpComponent } from '../faqs-help/faqs-help.component';
import { FaqsHowWorksComponent } from '../faqs-how-works/faqs-how-works.component';
import { FaqsAboutOdoucollectComponent } from '../faqs-about-odoucollect/faqs-about-odoucollect.component';

describe('FaqsComponent', () => {
  let component: FaqsComponent;
  let fixture: ComponentFixture<FaqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule],
      declarations: [FaqsComponent, FaqsTechnicsComponent, FaqsHelpComponent, FaqsHowWorksComponent, FaqsAboutOdoucollectComponent]
    });
    fixture = TestBed.createComponent(FaqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
