import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutStudyZoneComponent } from './about-study-zone.component';

describe('AboutStudyZoneComponent', () => {
  let component: AboutStudyZoneComponent;
  let fixture: ComponentFixture<AboutStudyZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutStudyZoneComponent]
    });
    fixture = TestBed.createComponent(AboutStudyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
