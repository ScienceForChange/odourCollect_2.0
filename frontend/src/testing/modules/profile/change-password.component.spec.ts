import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ChangePasswordComponent } from '../../../app/modules/profile/components/change-password/change-password.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User, createDummyUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ChangePasswordComponent', () => {

  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let userService: UserService;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, SharedComponentsModule, RouterTestingModule],
      declarations: [ChangePasswordComponent]
    });

    userService = TestBed.inject(UserService);

    routerMock = TestBed.inject(Router);

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería Cambiar el password y redirigir a map', () => {

    let user:User = createDummyUser();
    component.createPasswordRecover = new FormGroup({
      old_password: new FormControl('123123123'),
      new_password: new FormControl('123123123'),
      new_password_confirmation: new FormControl('123123123'),
    });

    const response = { status: 200, value: [] };
    jest.spyOn(userService, 'changePassword').mockReturnValueOnce(of(response));
    jest.spyOn(routerMock, 'navigate');

    component.send();

    expect(userService.changePassword).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/map']);
    
  });

  it('debería dar error al cambiar el password y vaciar campo nuevo password', () => {
    
    component.createPasswordRecover = new FormGroup({
      old_password: new FormControl('123123123'),
      new_password: new FormControl('123123123'),
      new_password_confirmation: new FormControl('123123123'),
    });

		const errorResponse = {
      status: 422,
      error: {errors: {new_password: ['Any error']}},
    };

    jest.spyOn(userService, 'changePassword').mockReturnValueOnce(throwError(() => errorResponse));
    jest.spyOn(component.createPasswordRecover.controls['new_password'], 'setErrors');
    
    component.send();

    expect(userService.changePassword).toHaveBeenCalled();
    expect(component.createPasswordRecover.controls['new_password'].setErrors).toHaveBeenCalledWith({'Any error': true});
    
  });

});
