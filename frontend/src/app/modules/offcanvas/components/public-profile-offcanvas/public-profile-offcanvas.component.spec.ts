import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { PublicProfileOffcanvasComponent } from './public-profile-offcanvas.component';
import { createDummyUser } from 'src/app/models/user';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';

describe('UserPublicProfileComponent', () => {
  let component: PublicProfileOffcanvasComponent;
  let fixture: ComponentFixture<PublicProfileOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgbActiveOffcanvas],
      imports: [HttpClientModule, SharedComponentsModule],
      declarations: [PublicProfileOffcanvasComponent],
    });
    fixture = TestBed.createComponent(PublicProfileOffcanvasComponent);
    component = fixture.componentInstance;
    component.user = createDummyUser();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
