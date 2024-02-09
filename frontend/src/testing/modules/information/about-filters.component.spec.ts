import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutFiltersComponent } from '../../../app/modules/information/components/about-filters/about-filters.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutFiltersComponent', () => {
  let component: AboutFiltersComponent;
  let fixture: ComponentFixture<AboutFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
      declarations: [AboutFiltersComponent]
    });
    fixture = TestBed.createComponent(AboutFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
