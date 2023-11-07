import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseEyeComponent } from './close-eye.component';

describe('CloseEyeComponent', () => {
  let component: CloseEyeComponent;
  let fixture: ComponentFixture<CloseEyeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CloseEyeComponent]
    });
    fixture = TestBed.createComponent(CloseEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
