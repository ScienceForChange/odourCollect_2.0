import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudyZonesComponent } from './my-study-zones.component';

describe('MyStudyZonesComponent', () => {
  let component: MyStudyZonesComponent;
  let fixture: ComponentFixture<MyStudyZonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyStudyZonesComponent]
    });
    fixture = TestBed.createComponent(MyStudyZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
