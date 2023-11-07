import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialConnectionComponent } from './social-connection.component';

describe('SocialConnectionComponent', () => {
  let component: SocialConnectionComponent;
  let fixture: ComponentFixture<SocialConnectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialConnectionComponent]
    });
    fixture = TestBed.createComponent(SocialConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
