import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOffcanvasComponent } from './menu-offcanvas.component';

describe('MenuOffcanvaComponent', () => {
  let component: MenuOffcanvasComponent;
  let fixture: ComponentFixture<MenuOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuOffcanvasComponent],
    });
    fixture = TestBed.createComponent(MenuOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
