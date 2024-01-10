import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';

import { RecoverCreatePasswordComponent } from '../../../app/modules/recoverCreatePassword/components/recover-create-password/recover-create-password.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { RecoverCreatePasswordService } from 'src/app/services/recover-create-password.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RecoverCreatePasswordComponent', () => {
  let component: RecoverCreatePasswordComponent;
  let fixture: ComponentFixture<RecoverCreatePasswordComponent>;
  let recoverCreatePasswordService: RecoverCreatePasswordService;
  let routerMock: Router;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientModule, SharedComponentsModule],
      declarations: [RecoverCreatePasswordComponent]
    });

    routerMock = TestBed.inject(Router);
    recoverCreatePasswordService = TestBed.inject(RecoverCreatePasswordService);
    
    fixture = TestBed.createComponent(RecoverCreatePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Debería redirigir a login', () => {

    component.createPasswordRecover = new FormGroup({
      password: new FormControl('123123123'),
      password_confirmation: new FormControl('123123123'),
    });

    const response = { status: 200, value: [] };
    jest.spyOn(recoverCreatePasswordService, 'postCreatePasswords').mockReturnValueOnce(of(response));
    jest.spyOn(routerMock, 'navigate');
    
    component.send();

    expect(recoverCreatePasswordService.postCreatePasswords).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    
  });
  
  it('debería dar error al cambiar el password y vaciar campo nuevo password', () => {
    
    component.createPasswordRecover = new FormGroup({
      password: new FormControl('123123123'),
      password_confirmation: new FormControl('123123123'),
    });

		const errorResponse = {
      status: 422,
      error: {errors: {password: ['Any error']}},
    };

    jest.spyOn(recoverCreatePasswordService, 'postCreatePasswords').mockReturnValueOnce(throwError(() => errorResponse));
    jest.spyOn(component.createPasswordRecover.controls['password'], 'setErrors');
   
    component.send();

    expect(recoverCreatePasswordService.postCreatePasswords).toHaveBeenCalled();
    expect(component.createPasswordRecover.controls['password'].setErrors).toHaveBeenCalled();
    
  });

});
