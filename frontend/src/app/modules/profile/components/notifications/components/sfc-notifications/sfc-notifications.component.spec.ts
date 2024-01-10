import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SfcNotificationsComponent } from './sfc-notifications.component';

describe('SfcNotificationsComponent', () => {
  let component: SfcNotificationsComponent;
  let fixture: ComponentFixture<SfcNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SfcNotificationsComponent]
    });
    fixture = TestBed.createComponent(SfcNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
