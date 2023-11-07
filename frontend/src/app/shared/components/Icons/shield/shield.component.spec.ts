import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldComponent } from './shield.component';

describe('ShieldComponent', () => {
  let component: ShieldComponent;
  let fixture: ComponentFixture<ShieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShieldComponent]
    });
    fixture = TestBed.createComponent(ShieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
