import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryStepsComponent } from './gallery-steps.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('GalleryStepsComponent', () => {
  let component: GalleryStepsComponent;
  let fixture: ComponentFixture<GalleryStepsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedComponentsModule, RouterTestingModule],
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
