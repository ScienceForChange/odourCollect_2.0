import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from '../../../app/modules/profile/components/profile/profile.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AboutTrainedUserComponent } from 'src/app/modules/information/components/about-trained-user/about-trained-user.component';
import { User, createDummyUser } from 'src/app/models/user';
import { create } from 'domain';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedComponentsModule],
      declarations: [ProfileComponent]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Al hacer click en el icono "info" deberia mostrar el offcanvas', () => {

    fixture.componentInstance.user = createDummyUser();
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('icon-info-square');
    let spy = jest.spyOn(NgbOffcanvas.prototype, 'open');
    
    button.click();
    
    expect(spy).toHaveBeenCalledWith(AboutTrainedUserComponent, {  position: 'start', scroll: false, panelClass: 'about-canvas'});

    
  });
});
