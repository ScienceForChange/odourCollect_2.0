import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsTechnicsComponent } from './faqs-technics.component';

describe('FaqsTechnicsComponent', () => {
  let component: FaqsTechnicsComponent;
  let fixture: ComponentFixture<FaqsTechnicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqsTechnicsComponent]
    });
    fixture = TestBed.createComponent(FaqsTechnicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
