import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OdourInformationComponent } from './odour-information.component';

describe('OdourInformationComponent', () => {
  let component: OdourInformationComponent;
  let fixture: ComponentFixture<OdourInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [OdourInformationComponent]
    });
    fixture = TestBed.createComponent(OdourInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
