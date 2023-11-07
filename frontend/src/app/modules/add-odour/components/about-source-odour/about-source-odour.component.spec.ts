import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSourceOdourComponent } from './about-source-odour.component';

describe('AboutSourceOdourComponent', () => {
  let component: AboutSourceOdourComponent;
  let fixture: ComponentFixture<AboutSourceOdourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutSourceOdourComponent]
    });
    fixture = TestBed.createComponent(AboutSourceOdourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
