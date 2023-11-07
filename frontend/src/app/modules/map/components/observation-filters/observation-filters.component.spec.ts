import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationFiltersComponent } from './observation-filters.component';

describe('ObservationFiltersComponent', () => {
  let component: ObservationFiltersComponent;
  let fixture: ComponentFixture<ObservationFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObservationFiltersComponent]
    });
    fixture = TestBed.createComponent(ObservationFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
