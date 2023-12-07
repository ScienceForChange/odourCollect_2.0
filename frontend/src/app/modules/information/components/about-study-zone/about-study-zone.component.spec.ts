import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutStudyZoneComponent } from './about-study-zone.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutStudyZoneComponent', () => {
  let component: AboutStudyZoneComponent;
  let fixture: ComponentFixture<AboutStudyZoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({      
      providers: [NgbActiveOffcanvas],
      imports: [SharedComponentsModule],
      declarations: [AboutStudyZoneComponent]
    });
    fixture = TestBed.createComponent(AboutStudyZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
