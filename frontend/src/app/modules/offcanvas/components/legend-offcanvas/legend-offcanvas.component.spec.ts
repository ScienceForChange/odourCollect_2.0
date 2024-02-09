import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendOffcanvasComponent } from './legend-offcanvas.component';

describe('LegendOffcanvasComponent', () => {
  let component: LegendOffcanvasComponent;
  let fixture: ComponentFixture<LegendOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegendOffcanvasComponent]
    });
    fixture = TestBed.createComponent(LegendOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
