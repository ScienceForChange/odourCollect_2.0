import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoObservationOffcanvaComponent } from './info-observation-offcanva.component';

describe('InfoObservationOffcanvaComponent', () => {
  let component: InfoObservationOffcanvaComponent;
  let fixture: ComponentFixture<InfoObservationOffcanvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoObservationOffcanvaComponent]
    });
    fixture = TestBed.createComponent(InfoObservationOffcanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
