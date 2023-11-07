import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdourLogoComponent } from './odour-logo.component';

describe('OdourLogoComponent', () => {
  let component: OdourLogoComponent;
  let fixture: ComponentFixture<OdourLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdourLogoComponent]
    });
    fixture = TestBed.createComponent(OdourLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
