import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion-filter.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[NgbAccordionModule],
      declarations: [AccordionComponent],
    });
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
