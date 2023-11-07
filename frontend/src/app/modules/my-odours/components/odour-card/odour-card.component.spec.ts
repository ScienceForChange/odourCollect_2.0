import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdourCardComponent } from './odour-card.component';

describe('OdourCardComponent', () => {
  let component: OdourCardComponent;
  let fixture: ComponentFixture<OdourCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdourCardComponent]
    });
    fixture = TestBed.createComponent(OdourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
