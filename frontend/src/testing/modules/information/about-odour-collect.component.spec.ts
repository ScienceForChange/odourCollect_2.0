import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutOdourCollectComponent } from '../../../app/modules/information/components/about-odour-collect/about-odour-collect.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutOdourCollectComponent', () => {
  let component: AboutOdourCollectComponent;
  let fixture: ComponentFixture<AboutOdourCollectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
      declarations: [AboutOdourCollectComponent]
    });
    fixture = TestBed.createComponent(AboutOdourCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
