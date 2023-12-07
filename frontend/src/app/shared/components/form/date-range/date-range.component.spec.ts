import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbDate, NgbDatepicker, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DateRangeComponent } from './date-range.component';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [DateRangeComponent]
    });
    // TODO @tomas creo que hay que crear un dommy de rango de fechas ¿?
    // fixture = TestBed.createComponent(DateRangeComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
