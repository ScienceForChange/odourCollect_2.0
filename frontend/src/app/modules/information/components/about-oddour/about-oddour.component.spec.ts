import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOddourComponent } from './about-oddour.component';

describe('AboutOddourComponent', () => {
  let component: AboutOddourComponent;
  let fixture: ComponentFixture<AboutOddourComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutOddourComponent]
    });
    fixture = TestBed.createComponent(AboutOddourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
