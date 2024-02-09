import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ObservationFiltersOffCanvasComponent } from './observation-filters-offcanvas.component';


describe('ObservationFiltersComponent', () => {
  let component: ObservationFiltersOffCanvasComponent;
  let fixture: ComponentFixture<ObservationFiltersOffCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ObservationFiltersOffCanvasComponent]
    });
    fixture = TestBed.createComponent(ObservationFiltersOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
