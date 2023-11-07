import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdourCollectComponent } from './odour-collect.component';

describe('OdourCollectComponent', () => {
  let component: OdourCollectComponent;
  let fixture: ComponentFixture<OdourCollectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdourCollectComponent]
    });
    fixture = TestBed.createComponent(OdourCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
