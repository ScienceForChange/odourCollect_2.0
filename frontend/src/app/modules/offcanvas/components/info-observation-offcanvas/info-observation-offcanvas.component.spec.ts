import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoObservationOffcanvasComponent } from './info-observation-offcanvas.component';

describe('InfoObservationOffcanvasComponent', () => {
  let component: InfoObservationOffcanvasComponent;
  let fixture: ComponentFixture<InfoObservationOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoObservationOffcanvasComponent],
    });
    fixture = TestBed.createComponent(InfoObservationOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
