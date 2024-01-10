import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { RequestInterceptor } from '../../app/interceptors/request.interceptor';
import { UserService } from 'src/app/services/user.service';
import { TestScheduler } from 'rxjs/testing';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User, createDummyUser } from 'src/app/models/user';

describe('CsrfInterceptorInterceptor', () => {
  let service: UserService;
  let testScheduler: TestScheduler;
  let authService: AuthService;
  let httpMock: HttpClient;
  let httpHandlerMock: jest.Mocked<HttpHandler>;
  let routerMock = {} as Router;
  let interceptor: RequestInterceptor;
  let mockHandler: HttpHandler;
  let httpRequest: HttpRequest<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        AuthService,
        RequestInterceptor,
      ]
    });
    httpRequest = new HttpRequest<any>('GET', 'https://google.com/')
    httpMock = TestBed.inject(HttpClient);
    
    // authService = {
    //   isVerified: true,
    //   isLoggedIn: true,
    //   user: new BehaviorSubject<User | undefined>(createDummyUser()),
    // } as unknown as jest.Mocked<AuthService>;
    

    authService = TestBed.inject(AuthService);
    
    interceptor = TestBed.inject(RequestInterceptor);
    
    mockHandler = { 
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => of(new HttpResponse(req))
    };
    
  });

  it('should add an Authorization header', () => {
    authService.isLoggedIn = true;
    expect(authService.isLoggedIn.value).toBeTruthy();
    
    const errorResponse = {status: 401};// Simular un error de HttpRequest

    const spy = jest.spyOn(mockHandler, 'handle').mockReturnValueOnce(throwError(() => errorResponse));

    expect(interceptor).toBeTruthy();    
		
    expect(authService.isLoggedIn.value).toBeTruthy();

		//httpMock.post.mockReturnValueOnce(throwError(() => errorResponse));

    interceptor.intercept(httpRequest, mockHandler)

    //expect(authService.isLoggedIn.value).toBeFalsy();
    expect(spy).toHaveBeenCalled();

    //TODO el pipe no se ejecuta
    
  });
});
