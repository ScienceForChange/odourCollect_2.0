import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsAboutOdoucollectComponent } from './faqs-about-odoucollect.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('FaqsAboutOdoucollectComponent', () => {
  let component: FaqsAboutOdoucollectComponent;
  let fixture: ComponentFixture<FaqsAboutOdoucollectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule],
      declarations: [FaqsAboutOdoucollectComponent]
    });
    fixture = TestBed.createComponent(FaqsAboutOdoucollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
