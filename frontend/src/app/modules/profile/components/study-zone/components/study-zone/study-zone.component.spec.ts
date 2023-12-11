import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyZoneComponent } from './study-zone.component';

describe('StudyZoneComponent', () => {
  let component: StudyZoneComponent;
  let fixture: ComponentFixture<StudyZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudyZoneComponent]
    });
    fixture = TestBed.createComponent(StudyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
