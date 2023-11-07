import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOdourComponent } from './add-odour.component';

describe('AddOdourComponent', () => {
  let component: AddOdourComponent;
  let fixture: ComponentFixture<AddOdourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOdourComponent]
    });
    fixture = TestBed.createComponent(AddOdourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
