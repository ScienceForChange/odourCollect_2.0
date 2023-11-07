import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsHelpComponent } from './faqs-help.component';

describe('FaqsHelpComponent', () => {
  let component: FaqsHelpComponent;
  let fixture: ComponentFixture<FaqsHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqsHelpComponent]
    });
    fixture = TestBed.createComponent(FaqsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
