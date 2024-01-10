import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { VerifyEmailComponent } from '../../../app/modules/verify-email/components/verify-email/verify-email.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { AuthService } from 'src/app/services/auth.service';
import { of, throwError } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;
  let authService: AuthService;
  let alertService: AlertService;
  let routerMock: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, SharedComponentsModule],
      declarations: [VerifyEmailComponent]
    });

    authService = TestBed.inject(AuthService);
    alertService = TestBed.inject(AlertService);
    routerMock = TestBed.inject(Router);

    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería alertar de que el correo de verificación se ha enviado correctamente', () => {  

    jest.spyOn(authService, 'resendVerifyEmail').mockReturnValueOnce(of({ status: 200, value: [] }));
    const spyAlert = jest.spyOn(alertService, 'success');
    
    component.resendVerifyEmail();
 
    expect(spyAlert).toHaveBeenCalled();
    
  });
  
  it('debería alertar de que hubo un error', () => {  

    jest.spyOn(authService, 'resendVerifyEmail').mockReturnValueOnce(throwError(() => { return { status: 422 } }));
    
    const spyAlert = jest.spyOn(alertService, 'error');

    component.resendVerifyEmail();
 
    expect(spyAlert).toHaveBeenCalled();
    
  });
  
  it('debería redirigir al ver que el correo ya estaba verificado', () => {  

    authService.isVerified = true;
    jest.spyOn(authService, 'resendVerifyEmail').mockReturnValueOnce(throwError(() => { return { status: 422 } }));
    
    const spyAlert = jest.spyOn(alertService, 'success');
    const spyRouter = jest.spyOn(routerMock, 'navigate');
    
    component.resendVerifyEmail();
 
    expect(spyAlert).toHaveBeenCalled();
    expect(spyRouter).toHaveBeenCalledWith(['/']);
    
  });
  
});
