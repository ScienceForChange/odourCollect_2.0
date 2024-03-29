import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvatarComponent } from '../../../app/modules/profile/components/edit-avatar/edit-avatar.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { createDummyUser } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';


describe('EditAvatarComponent', () => {
  let component: EditAvatarComponent;
  let fixture: ComponentFixture<EditAvatarComponent>;
  let routerMock: Router;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [EditAvatarComponent]
    });

    routerMock = TestBed.inject(Router);
    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;

    fixture = TestBed.createComponent(EditAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Al hacer clic en un avatar deberia cambiar el id en el componente', () => {

    component.user = createDummyUser();
    const response = { status: 200, value: [] };

    jest.spyOn(userService, 'update').mockReturnValueOnce(of(response));
    jest.spyOn(routerMock, 'navigate');

    fixture.detectChanges();
    let avatar = fixture.debugElement.nativeElement.querySelectorAll('img');

    expect(component.newAvatar).toBe(1);

    avatar[avatar.length - 1].click();

    expect(component.newAvatar).toBeGreaterThan(1);
    expect(userService.update).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/profile']);

  });

});
