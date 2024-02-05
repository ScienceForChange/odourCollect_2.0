import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { FiltersMyOdoursOffcanvasComponent } from './filters-my-odours-offcanvas.component';

describe('FiltersMyOdoursOffcanvasComponent', () => {
  let component: FiltersMyOdoursOffcanvasComponent;
  let fixture: ComponentFixture<FiltersMyOdoursOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [FiltersMyOdoursOffcanvasComponent],
    });
    fixture = TestBed.createComponent(FiltersMyOdoursOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
