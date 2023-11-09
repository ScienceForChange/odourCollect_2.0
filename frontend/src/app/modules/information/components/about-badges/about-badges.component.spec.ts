import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBadgesComponent } from './about-badges.component';

describe('AboutBadgesComponent', () => {
  let component: AboutBadgesComponent;
  let fixture: ComponentFixture<AboutBadgesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutBadgesComponent]
    });
    fixture = TestBed.createComponent(AboutBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
