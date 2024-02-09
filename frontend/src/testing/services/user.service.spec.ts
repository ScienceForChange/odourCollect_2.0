import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { UserService } from '../../app/services/user.service';
import { User, createDummyUser } from '../../app/models/user';
import { Observation } from '../../app/models/observation';
import { AuthService } from '../../app/services/auth.service';
import { Router } from '@angular/router';

describe('UserService', () => {
  let service: UserService;
  let testScheduler: TestScheduler;
  let authService: jest.Mocked<AuthService>;
  let httpMock: jest.Mocked<HttpClient>;
  let routerMock = {} as Router;
  let tokenExtractorMock = {} as HttpXsrfTokenExtractor;
  let observation: Observation;

  beforeEach(() => {
    httpMock = {
      post: jest.fn(),
      get: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    authService = {
      isVerified: true,
      user: new BehaviorSubject<User | undefined>(createDummyUser()),
    } as jest.Mocked<AuthService>;

    service = new UserService(httpMock, authService);

    observation = {
      color: 1,
      id: 9097,
      latitude: '41.32550',
      longitude: '2.11150',
      relationships: {
        odourSubType: {
          id: 11,
          name: 'Rotten eggs',
          slug: 'rotten-eggs',
          relationships: {
            odourType: {
              id: 2,
              name: 'Waste Water',
              slug: 'waste-water',
              relationships: {
                odourSubTypes: [],
              },
            },
          },
        },
        odourIntensity: {
          id: 4,
          name: 'Distinct',
          power: 3,
          slug: 'distinct',
        },
        odourHedonicTone: {
          id: 4,
          index: -1,
          name: 'Slightly unpleasant',
          slug: 'slightly-unpleasant',
        },
        comments: [],
      },
      likes: 0,
      liked: false,
      description: null,
      origin: null,
      createdAt: new Date('2021-06-14T09:21:16.000000Z'),
      updatedAt: new Date('2021-06-14T09:21:16.000000Z'),
    };

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should be created and user is logout', () => {
    authService.user.next(undefined);

    expect(service.user).toBeUndefined();
    expect(service).toBeTruthy();
  });

  it('should be created and user is login', () => {
    expect(service.user).toBeTruthy();
    expect(service).toBeTruthy();
  });

  it('Debería comprobar que el usuario esta verificado', () => {
    const obs$ = service.checkVerifyUser();

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(---a--|)'; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
      const expectedValues = { a: true }; // valor emitido 'a' con el valor de 'response'

      expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
  });

  it('Debería comprobar que el usuario no esta verificado', () => {
    authService.isVerified = false;

    expect(authService.isVerified).toBeFalsy();
    const response = { status: 200, value: [] };
    httpMock.get.mockReturnValueOnce(of(response));

    const obs$ = service.checkVerifyUser();

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(---a--|)'; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
      const expectedValues = { a: true }; // valor emitido 'a' con el valor de 'response'

      expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });

    expect(authService.isVerified).toBeTruthy();
  });

  it('Debería borrar el usuario', () => {
    const response = { status: 200, value: [] };
    httpMock.delete.mockReturnValueOnce(of(response));

    const obs$ = service.delete();

    expect(authService.user.value).toBeTruthy();

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(---a--|)'; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
      const expectedValues = { a: true }; // valor emitido 'a' con el valor de 'response'

      expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });

    expect(authService.user).toBeUndefined();
  });

  it('Debería actualizar el usuario', () => {
    const response = { status: 200, value: [] };
    httpMock.patch.mockReturnValueOnce(of(response));

    const obs$ = service.update();

    expect(authService.user.value).toBeTruthy();

    testScheduler.run(({ expectObservable }) => {
      const expectedMarble = '(---a--|)'; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
      const expectedValues = { a: response }; // valor emitido 'a' con el valor de 'response'

      expectObservable(obs$).toBe(expectedMarble, expectedValues);
    });
  });

  it('Añadir y eliminar obs al perfil de usuario', () => {
    expect(authService.user.value).toBeTruthy();

    service.addObservation(observation);
    //TODO expect(authService.user.value?.total_observations).toBe(1);
    service.removeObservation(observation.id);
    //TODO expect(authService.user.value?.total_observations).toBe(0);
  });
});
