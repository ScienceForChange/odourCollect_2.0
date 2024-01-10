import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RecoverPasswordComponent } from '../../../app/modules/recoverPassword/components/recover-password/recover-password.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { RecoverPasswordService } from 'src/app/services/recover-password.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RecoverPasswordComponent', () => {
  let component: RecoverPasswordComponent;
  let fixture: ComponentFixture<RecoverPasswordComponent>;
  let recoverPasswordService: RecoverPasswordService;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgControl],
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, SharedComponentsModule],
      declarations: [RecoverPasswordComponent]
    });
    
    routerMock = TestBed.inject(Router);
    recoverPasswordService = TestBed.inject(RecoverPasswordService);

    fixture = TestBed.createComponent(RecoverPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('Debería redirigir a login', () => {

    expect(component.checkEmail).toBeFalsy();
    component.recoverPassword = new FormGroup({
    });

    const response = { status: 200, value: [] };
    jest.spyOn(recoverPasswordService, 'postEmail').mockReturnValueOnce(of(response));
    jest.spyOn(routerMock, 'navigate');
    
    component.send();

    expect(recoverPasswordService.postEmail).toHaveBeenCalled();
    expect(component.checkEmail).toBeTruthy();
    
  });
  
  it('debería dar error al cambiar el password y vaciar campo nuevo password', () => {
    expect(component.checkEmail).toBeFalsy();
    component.recoverPassword = new FormGroup({
      email: new FormControl('dummy@dummy.com')
    });

		const errorResponse = {
      status: 422,
      error: {errors: {password: ['Any error']}},
    };

    jest.spyOn(recoverPasswordService, 'postEmail').mockReturnValueOnce(throwError(() => errorResponse));
    jest.spyOn(component.recoverPassword.controls['email'], 'setErrors');
   
    component.send();

    expect(recoverPasswordService.postEmail).toHaveBeenCalled();
    expect(component.checkEmail).toBeFalsy();
    
  });
  
});
