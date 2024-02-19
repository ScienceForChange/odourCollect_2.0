import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutOdourSourceComponent } from '../../../app/modules/information/components/about-odour-source/about-odour-source.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutOdourSourceComponent', () => {
  let component: AboutOdourSourceComponent;
  let fixture: ComponentFixture<AboutOdourSourceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
      declarations: [AboutOdourSourceComponent]
    });
    fixture = TestBed.createComponent(AboutOdourSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
