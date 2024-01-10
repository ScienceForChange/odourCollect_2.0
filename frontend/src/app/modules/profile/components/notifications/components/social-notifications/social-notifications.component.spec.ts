import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialNotificationsComponent } from './social-notifications.component';

describe('SocialNotificationsComponent', () => {
  let component: SocialNotificationsComponent;
  let fixture: ComponentFixture<SocialNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialNotificationsComponent]
    });
    fixture = TestBed.createComponent(SocialNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
