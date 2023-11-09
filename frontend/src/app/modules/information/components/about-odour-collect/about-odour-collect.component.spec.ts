import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOdourCollectComponent } from './about-odour-collect.component';

describe('AboutOdourCollectComponent', () => {
  let component: AboutOdourCollectComponent;
  let fixture: ComponentFixture<AboutOdourCollectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutOdourCollectComponent]
    });
    fixture = TestBed.createComponent(AboutOdourCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
