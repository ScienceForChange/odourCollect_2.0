import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDataProtectionComponent } from './about-data-protection.component';

describe('AboutDataProtectionComponent', () => {
  let component: AboutDataProtectionComponent;
  let fixture: ComponentFixture<AboutDataProtectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutDataProtectionComponent]
    });
    fixture = TestBed.createComponent(AboutDataProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
