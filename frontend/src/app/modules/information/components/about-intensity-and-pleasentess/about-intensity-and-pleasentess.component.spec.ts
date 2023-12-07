import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutIntensityAndPleasentessComponent } from './about-intensity-and-pleasentess.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutIntensityAndPleasentessComponent', () => {
  let component: AboutIntensityAndPleasentessComponent;
  let fixture: ComponentFixture<AboutIntensityAndPleasentessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
      declarations: [AboutIntensityAndPleasentessComponent]
    });
    fixture = TestBed.createComponent(AboutIntensityAndPleasentessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
