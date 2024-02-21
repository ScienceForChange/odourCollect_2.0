import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileModalComponent } from './complete-profile-modal.component';

describe('CompleteProfileModalComponent', () => {
  let component: CompleteProfileModalComponent;
  let fixture: ComponentFixture<CompleteProfileModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteProfileModalComponent]
    });
    fixture = TestBed.createComponent(CompleteProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
