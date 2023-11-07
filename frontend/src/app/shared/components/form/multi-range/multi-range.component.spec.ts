import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRangeComponent } from './multi-range.component';

describe('MultiRangeComponent', () => {
  let component: MultiRangeComponent;
  let fixture: ComponentFixture<MultiRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiRangeComponent]
    });
    fixture = TestBed.createComponent(MultiRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
