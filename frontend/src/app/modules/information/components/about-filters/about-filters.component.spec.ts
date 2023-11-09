import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutFiltersComponent } from './about-filters.component';

describe('AboutFiltersComponent', () => {
  let component: AboutFiltersComponent;
  let fixture: ComponentFixture<AboutFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutFiltersComponent]
    });
    fixture = TestBed.createComponent(AboutFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
