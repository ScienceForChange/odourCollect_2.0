import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburguerComponent } from './hamburguer.component';

describe('HamburguerComponent', () => {
  let component: HamburguerComponent;
  let fixture: ComponentFixture<HamburguerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HamburguerComponent]
    });
    fixture = TestBed.createComponent(HamburguerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
