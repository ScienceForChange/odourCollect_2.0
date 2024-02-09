import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AboutBadgesComponent } from '../../../app/modules/information/components/about-badges/about-badges.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('AboutBadgesComponent', () => {
  let component: AboutBadgesComponent;
  let fixture: ComponentFixture<AboutBadgesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas, NgbOffcanvas],
      imports: [SharedComponentsModule],
      declarations: [AboutBadgesComponent]
    });
    fixture = TestBed.createComponent(AboutBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
