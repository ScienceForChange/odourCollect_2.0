import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOffcanvaComponent } from './menu-offcanva.component';

describe('MenuOffcanvaComponent', () => {
  let component: MenuOffcanvaComponent;
  let fixture: ComponentFixture<MenuOffcanvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuOffcanvaComponent]
    });
    fixture = TestBed.createComponent(MenuOffcanvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
