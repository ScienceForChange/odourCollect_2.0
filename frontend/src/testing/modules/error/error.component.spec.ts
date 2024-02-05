import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ErrorComponent } from '../../../app/modules/error/components/error/error.component';
import { AuthService } from 'src/app/services/auth.service';
import { TestScheduler } from 'rxjs/testing';
import { of, throwError } from 'rxjs';
import { createDummyUser } from 'src/app/models/user';
import { Location } from '@angular/common'
import { error } from 'console';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let authService: AuthService;
  let testScheduler: TestScheduler;
  let location: Location;

  beforeEach(() => {
  
    TestBed.configureTestingModule({
      
      imports: [HttpClientModule],
      declarations: [ErrorComponent]
    });
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    location = TestBed.inject(Location);
    
    testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a la función retry', () => {
    let spy = jest.spyOn(component, 'retry');
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('debería llamar a la función retry y redirigir a la pagina anterior con location.back()', () => {
    
    let response = { status: 200, data:  createDummyUser() };

    jest.spyOn(authService, 'refreshToken').mockReturnValueOnce(of(response));
    jest.spyOn(location, 'back');

    //llamamos a la función retry
    component.retry();

    //comprobamos que se ha llamado a la función refreshToken
    expect(authService.refreshToken).toHaveBeenCalled();
    //comprobamos que se ha llamado a la función back del location
    expect(location.back).toHaveBeenCalled();

    expect(component.loading).toBeFalsy();
        
  });

  it('debería llamar a la función retry y permanecer al seguir recibiendo error', () => {
      
      let errorResponse = new ErrorEvent('Error');

      jest.spyOn(authService, 'refreshToken').mockReturnValueOnce(throwError(() => errorResponse));
      jest.spyOn(location, 'back');
  
      //llamamos a la función retry
      component.retry();
  
      //comprobamos que se ha llamado a la función refreshToken
      expect(authService.refreshToken).toHaveBeenCalled();
      //comprobamos que no se ha llamado a la función back del location
      expect(location.back).not.toHaveBeenCalled();
  
      expect(component.loading).toBeFalsy();
  });

});
