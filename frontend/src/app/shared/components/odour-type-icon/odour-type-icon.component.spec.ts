import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdourTypeIconComponent } from './odour-type-icon.component';

describe('OdourTypeIconComponent', () => {
  let component: OdourTypeIconComponent;
  let fixture: ComponentFixture<OdourTypeIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdourTypeIconComponent]
    });
    fixture = TestBed.createComponent(OdourTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
