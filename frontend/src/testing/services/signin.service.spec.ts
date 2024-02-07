import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { of } from "rxjs";
import { TestScheduler } from "rxjs/testing";

import { SigninService } from '../../app/services/signin.service';
import { createDummySingUpUser, createDummyUser } from '../../app/models/user';

describe('SigninService', () => {
  let service: SigninService;
  let testScheduler: TestScheduler;
  let httpMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpMock = {
      post: jest.fn(),
      get:  jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    service = new SigninService(httpMock);

    testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("simular registro de usuario", () => {

    const newUser =  createDummySingUpUser();
    const response = { status: 200, data:  createDummyUser() };

    httpMock.post.mockReturnValueOnce(of(response));

    const obs$ = service.postNewUser(newUser);

    testScheduler.run(({ expectObservable }) => {

      const expectedMarble = "(---a--|)"; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
			const expectedValues = { a: { status: 200, data:  createDummyUser() } }; // valor emitido 'a' con el valor de 'response'

      expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });

  });

});

