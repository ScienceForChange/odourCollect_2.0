import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsHowWorksComponent } from './faqs-how-works.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('FaqsHowWorksComponent', () => {
  let component: FaqsHowWorksComponent;
  let fixture: ComponentFixture<FaqsHowWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule],
      declarations: [FaqsHowWorksComponent]
    });
    fixture = TestBed.createComponent(FaqsHowWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
