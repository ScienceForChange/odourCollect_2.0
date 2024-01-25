import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../../../app/modules/login/components/login.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { User, createDummyUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jest.Mocked<AuthService>;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;

    routerMock = TestBed.inject(Router);
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeFalsy();
  })

  it('debería hacer login y redirigir', () => {

    let user:User = createDummyUser();
    component.loginForm = new FormGroup({
      email: new FormControl(user.email),
      password: new FormControl('123123123'),
    });

    const response = { status: 200, value: [] };
    jest.spyOn(authService, 'login').mockReturnValueOnce(of(response));
    jest.spyOn(routerMock, 'navigate');

    component.send();

    expect(authService.login).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/map']);
    
  });

  it('debería dar error login y poner loading en false', () => {

    let user:User = createDummyUser();
    component.loginForm = new FormGroup({
      email: new FormControl(user.email),
      password: new FormControl('123123123'),
      password_confirmation: new FormControl('123123123'),
    });

		const errorResponse = {
      status: 422,
      message: 'Unprocessable Entity',
      error:{
        errors:{
          email:['The email field is required.']
        }
      }
    };
    jest.spyOn(authService, 'login').mockReturnValueOnce(throwError(() => errorResponse));
    jest.spyOn(routerMock, 'navigate');

    component.send();

    expect(authService.login).toHaveBeenCalled();
    expect(component.loginForm.controls['password'].value).toBeFalsy()
    expect(component.loading).toBeFalsy();
    
  });
});
