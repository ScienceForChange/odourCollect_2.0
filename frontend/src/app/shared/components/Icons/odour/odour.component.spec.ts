import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdourComponent } from './odour.component';

describe('OdourComponent', () => {
  let component: OdourComponent;
  let fixture: ComponentFixture<OdourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdourComponent]
    });
    fixture = TestBed.createComponent(OdourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
