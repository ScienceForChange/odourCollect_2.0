import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowRight2Component } from './arrow-right2.component';

describe('ArrowRight2Component', () => {
  let component: ArrowRight2Component;
  let fixture: ComponentFixture<ArrowRight2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrowRight2Component]
    });
    fixture = TestBed.createComponent(ArrowRight2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
