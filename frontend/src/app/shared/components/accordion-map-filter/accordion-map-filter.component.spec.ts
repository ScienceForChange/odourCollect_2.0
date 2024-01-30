import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionMapFilterComponent } from './accordion-map-filter.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

describe('AccordionMapFilterComponent', () => {
  let component: AccordionMapFilterComponent;
  let fixture: ComponentFixture<AccordionMapFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[NgbAccordionModule],
      declarations: [AccordionMapFilterComponent],
    });
    fixture = TestBed.createComponent(AccordionMapFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
