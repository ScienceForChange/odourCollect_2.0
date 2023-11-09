import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOdourSourceComponent } from './about-odour-source.component';

describe('AboutOdourSourceComponent', () => {
  let component: AboutOdourSourceComponent;
  let fixture: ComponentFixture<AboutOdourSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutOdourSourceComponent]
    });
    fixture = TestBed.createComponent(AboutOdourSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
