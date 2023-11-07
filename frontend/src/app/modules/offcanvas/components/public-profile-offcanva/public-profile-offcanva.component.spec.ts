import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfileOffcanvaComponent } from './public-profile-offcanva.component';

describe('UserPublicProfileComponent', () => {
  let component: PublicProfileOffcanvaComponent;
  let fixture: ComponentFixture<PublicProfileOffcanvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicProfileOffcanvaComponent]
    });
    fixture = TestBed.createComponent(PublicProfileOffcanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
