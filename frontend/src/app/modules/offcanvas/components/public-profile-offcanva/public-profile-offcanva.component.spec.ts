import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { PublicProfileOffcanvaComponent } from './public-profile-offcanva.component';
import { createDummyUser } from 'src/app/models/user';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('UserPublicProfileComponent', () => {
  let component: PublicProfileOffcanvaComponent;
  let fixture: ComponentFixture<PublicProfileOffcanvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [HttpClientModule, SharedComponentsModule],
      declarations: [PublicProfileOffcanvaComponent]
    });
    fixture = TestBed.createComponent(PublicProfileOffcanvaComponent);
    component = fixture.componentInstance;
    component.user = createDummyUser()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
