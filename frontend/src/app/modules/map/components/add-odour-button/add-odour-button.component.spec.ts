import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOdourButtonComponent } from './add-odour-button.component';

describe('AddOdourButtonComponent', () => {
  let component: AddOdourButtonComponent;
  let fixture: ComponentFixture<AddOdourButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOdourButtonComponent]
    });
    fixture = TestBed.createComponent(AddOdourButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
