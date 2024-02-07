import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SignupComponent } from '../../../app/modules/signup/components/signup/signup.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninService } from 'src/app/services/signin.service';
import { of, throwError } from 'rxjs';
import { createDummyUser } from 'src/app/models/user';
import { ActivateAccountComponent } from 'src/app/modules/signup/components/activate-account/activate-account.component';

describe('SigninComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let signinService: SigninService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [SignupComponent, ActivateAccountComponent]
    });

    signinService = TestBed.inject(SigninService);

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería enviarse el formulario y crearse un usuario', () => {

    component.signUpForm = new FormGroup({
      email: new FormControl('dummy@dummy.com'),
      password: new FormControl('123123123'),
      password_confirmation: new FormControl('123123123'),
      dpo: new FormControl(true),
      etic: new FormControl(true),
      name: new FormControl('dummy'),
      birth_year: new FormControl('01/01/2001'),
      gender: new FormControl(''),
    });

    jest.spyOn(signinService, 'postNewUser').mockReturnValueOnce(of({ status: 200, data: [createDummyUser()] }));

    component.send();

    fixture.detectChanges();
    expect(signinService.postNewUser).toHaveBeenCalled();
    expect(component.activateAccount).toBeTruthy();
    expect(fixture.debugElement.nativeElement.querySelector('app-activate-account')).toBeTruthy()

  });

  it('debería enviarse el formulario y devolver error', () => {

      component.signUpForm = new FormGroup({
        email: new FormControl('dummy@dummy.com'),
        password: new FormControl('123123123'),
        password_confirmation: new FormControl('123123123'),
        dpo: new FormControl(true),
        etic: new FormControl(true),

        relationships: new FormGroup({

          profile: new FormGroup({

            name: new FormControl('dummy'),
            birth_year: new FormControl('01/01/2001'),
            gender: new FormControl(''),

          }),

        }),

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
      jest.spyOn(signinService, 'postNewUser').mockReturnValueOnce(throwError(() => errorResponse));
      jest.spyOn(component.signUpForm.controls['email'], 'setErrors');

      component.send();

      expect(signinService.postNewUser).toHaveBeenCalled();
      expect(component.activateAccount).toBeFalsy();
      expect(component.signUpForm.controls['email'].setErrors).toHaveBeenCalled()
      expect(fixture.debugElement.nativeElement.querySelector('app-activate-account')).toBeFalsy()

  });
});
