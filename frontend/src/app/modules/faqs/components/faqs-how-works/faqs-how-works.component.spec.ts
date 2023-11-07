import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsHowWorksComponent } from './faqs-how-works.component';

describe('FaqsHowWorksComponent', () => {
  let component: FaqsHowWorksComponent;
  let fixture: ComponentFixture<FaqsHowWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
