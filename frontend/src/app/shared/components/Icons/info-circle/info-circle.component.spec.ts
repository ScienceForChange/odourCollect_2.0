import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCircleComponent } from './info-circle.component';

describe('InfoCircleComponent', () => {
  let component: InfoCircleComponent;
  let fixture: ComponentFixture<InfoCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoCircleComponent]
    });
    fixture = TestBed.createComponent(InfoCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
