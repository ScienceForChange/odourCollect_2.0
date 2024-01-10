import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { BadgesComponent } from '../../../app/modules/profile/components/badges/badges.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';

describe('BadgesComponent', () => {
  let component: BadgesComponent;
  let fixture: ComponentFixture<BadgesComponent>;
  let offcanvasService: NgbOffcanvas;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedComponentsModule],
      declarations: [BadgesComponent]
    });
    offcanvasService = TestBed.inject(NgbOffcanvas);
    fixture = TestBed.createComponent(BadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`debería abrirse el offcanvas "Trained"`, () => { 

    let spy = jest.spyOn(offcanvasService, 'open');
    component.openAboutTrainedOffcanvas();
    expect(offcanvasService).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturned();

  });

  it(`debería abrirse el offcanvas "Badges"`, () => { 

    let spy = jest.spyOn(offcanvasService, 'open');
    component.openAboutBadgesOffcanvas();
    expect(offcanvasService).toBeTruthy();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveReturned();

  });


});
