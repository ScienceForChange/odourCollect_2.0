import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header.component';
import { HamburguerComponent } from '../hamburguer/hamburguer.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FiltersComponent } from '../filters/filters.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedComponentsModule],
      declarations: [HeaderComponent, HamburguerComponent, FiltersComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
