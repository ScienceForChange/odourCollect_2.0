import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule, HttpXsrfTokenExtractor } from '@angular/common/http';
import { of, throwError } from "rxjs";
import { TestScheduler } from "rxjs/testing";

import { AuthService } from './auth.service';
import { User, createDummyUser } from '../models/user';
import { Router } from '@angular/router';

describe('LoginService', () => {
  let service: AuthService;
  let testScheduler: TestScheduler;
  let routerMock: jest.Mocked<Router>;
  let httpMock: jest.Mocked<HttpClient>;
  let xsrfTokenExtractorMock: jest.Mocked<HttpXsrfTokenExtractor>;


  beforeEach(() => {
    
    httpMock = {
      post: jest.fn(),
      get:  jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    xsrfTokenExtractorMock = {
      getToken: jest.fn(),
    } as jest.Mocked<HttpXsrfTokenExtractor>;

    service = new AuthService(httpMock, routerMock, xsrfTokenExtractorMock);

    testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});

  });

  it('crear servicio', () => {
    expect(service).toBeTruthy();
  });

  it("simular proceso de login", () => {

    const userLogin =  { email: 'test@test.com', password: 'testpassword' };
    const response = { status: 200, data:  createDummyUser() };

    httpMock.post.mockReturnValueOnce(of(response));
    xsrfTokenExtractorMock.getToken.mockReturnValue('fakeXsrfToken');

    expect(service.isLoggedIn.value).toBeFalsy();

    const obs$ = service.login(userLogin);
    
    testScheduler.run(({ expectObservable }) => {

      const expectedMarble = "(---a--|)"; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
			const expectedValues = { a: { status: 200, data:  createDummyUser() } }; // valor emitido 'a' con el valor de 'response'
      
      expectObservable(obs$).toBe(expectedMarble, expectedValues);

    });
    
    // Verificar logueo
    expect(service.isLoggedIn.value).toBeTruthy();
    // Verificar que el método navigate ha sido llamado
    expect(routerMock.navigate).toHaveBeenCalledWith(['/map']);
  });
  
  it("simular proceso de logout", () => {
    
    service.isLoggedIn = true;
    
    expect(service.isLoggedIn.value).toBeTruthy();
    
    httpMock.post.mockReturnValue(of(null));
    service.logout('/map');

    expect(service.isLoggedIn.value).toBeFalsy();

    // Verificar que el método navigate ha sido llamado
    expect(routerMock.navigate).toHaveBeenCalledWith(['/map']);
  });

  it("simular error de logueo", () => {

    const userLogin =  { email: 'test@test.com', password: 'testpassword' };
		const errorResponse = new Error("Error de autenticación");// Simular un error de HttpClient
		
    expect(service.isLoggedIn.value).toBeFalsy();

		httpMock.post.mockReturnValueOnce(throwError(() => errorResponse));
    const obs$ = service.login(userLogin);

		testScheduler.run(({ expectObservable }) => {

			const expectedMarble = "(--#)"; // Emisión de error

			// Verificar que el observable se comporta como se espera
			expectObservable(obs$).toBe(expectedMarble, null, errorResponse);

		});
    // Verificar que sigue sin estar logueado
    expect(service.isLoggedIn.value).toBeFalsy();

	});

  it("simular refresh token", () => {
    const response = { status: 200, data:  createDummyUser() };

    xsrfTokenExtractorMock.getToken.mockReturnValueOnce('fakeXsrfToken');
    httpMock.get.mockReturnValue(of(response));
    const obs$ = service.refreshToken();

    testScheduler.run(({ expectObservable }) => {
        
        const expectedMarble = "(--a-|)"; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
        const expectedValues = { a: { status: 200, data:  createDummyUser() } }; // valor emitido 'a' con el valor de 'response'
        
        expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
    
    // Verificar logueo
    expect(service.isLoggedIn.value).toBeTruthy();
  });

  it("simular error refresh token", () => {
    
    xsrfTokenExtractorMock.getToken.mockReturnValue('fakeXsrfToken');
    const errorResponse = { status: 401, message: 'Error de autenticación' };
		httpMock.get.mockReturnValue( throwError(() => errorResponse) );
    const obs$ = service.refreshToken();

    testScheduler.run(({ expectObservable }) => {
        
        const expectedMarble = "(--a-|)"; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
        const expectedValues = { a: false }; // valor emitido 'a' con el valor de 'response'

        expectObservable(obs$).toBe(expectedMarble,  expectedValues);
    });
    
    // Verificar logueo
    expect(service.isLoggedIn.value).toBeFalsy();
  });

  it("simular refresh token con redireccion", () => {
  
    xsrfTokenExtractorMock.getToken.mockReturnValueOnce(null);
    const errorResponse = { status: 401, message: 'Error de autenticación' };
		httpMock.get.mockReturnValue(throwError(() => errorResponse) );
    service.refreshToken();
  
    // Verificar que el método navigate ha sido llamado
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
    
  });

  it("simular refresh token permite navegar", () => {
  
    xsrfTokenExtractorMock.getToken.mockReturnValue('fakeXsrfToken');
    const errorResponse = { status: 401, message: 'Error de autenticación' };
		httpMock.get.mockReturnValue(throwError(() => errorResponse) );
    const obs$ = service.refreshToken(true);

    testScheduler.run(({ expectObservable }) => {
        
        const expectedMarble = "(a|)"; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
        const expectedValues = { a: true }; // valor emitido 'a' con el valor de 'response'

        expectObservable(obs$).toBe(expectedMarble,  expectedValues);
    });

  });

});

