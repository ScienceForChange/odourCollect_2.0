import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamingModalComponent } from './gaming-modal.component';

describe('GamingModalComponent', () => {
  let component: GamingModalComponent;
  let fixture: ComponentFixture<GamingModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamingModalComponent]
    });
    fixture = TestBed.createComponent(GamingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
