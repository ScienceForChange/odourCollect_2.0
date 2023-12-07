import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsTechnicsComponent } from './faqs-technics.component';
import { AccordionComponent } from 'src/app/shared/components/accordion/accordion.component';

describe('FaqsTechnicsComponent', () => {
  let component: FaqsTechnicsComponent;
  let fixture: ComponentFixture<FaqsTechnicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaqsTechnicsComponent, AccordionComponent]
    });
    fixture = TestBed.createComponent(FaqsTechnicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
