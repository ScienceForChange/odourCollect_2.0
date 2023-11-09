import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutIntensityAndPleasentessComponent } from './about-intensity-and-pleasentess.component';

describe('AboutIntensityAndPleasentessComponent', () => {
  let component: AboutIntensityAndPleasentessComponent;
  let fixture: ComponentFixture<AboutIntensityAndPleasentessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutIntensityAndPleasentessComponent]
    });
    fixture = TestBed.createComponent(AboutIntensityAndPleasentessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
