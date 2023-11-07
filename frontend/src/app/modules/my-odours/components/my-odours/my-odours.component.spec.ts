import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOdoursComponent } from './my-odours.component';

describe('MyOdoursComponent', () => {
  let component: MyOdoursComponent;
  let fixture: ComponentFixture<MyOdoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyOdoursComponent]
    });
    fixture = TestBed.createComponent(MyOdoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
