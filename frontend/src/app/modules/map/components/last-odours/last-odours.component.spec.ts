import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastOdoursComponent } from './last-odours.component';

describe('LastOdoursComponent', () => {
  let component: LastOdoursComponent;
  let fixture: ComponentFixture<LastOdoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LastOdoursComponent]
    });
    fixture = TestBed.createComponent(LastOdoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
