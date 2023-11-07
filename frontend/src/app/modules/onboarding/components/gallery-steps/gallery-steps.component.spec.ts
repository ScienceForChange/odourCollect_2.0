import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryStepsComponent } from './gallery-steps.component';

describe('GalleryStepsComponent', () => {
  let component: GalleryStepsComponent;
  let fixture: ComponentFixture<GalleryStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryStepsComponent]
    });
    fixture = TestBed.createComponent(GalleryStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
