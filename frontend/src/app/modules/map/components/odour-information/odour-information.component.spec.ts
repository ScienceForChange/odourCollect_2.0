import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdourInformationComponent } from './odour-information.component';

describe('OdourInformationComponent', () => {
  let component: OdourInformationComponent;
  let fixture: ComponentFixture<OdourInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdourInformationComponent]
    });
    fixture = TestBed.createComponent(OdourInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
