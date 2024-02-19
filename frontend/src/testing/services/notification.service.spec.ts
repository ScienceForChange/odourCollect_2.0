import { TestBed } from '@angular/core/testing';

import { NotificationService } from '../../app/services/notification.service';
import { TestScheduler } from 'rxjs/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: jest.Mocked<HttpClient>;
  let authService:  jest.Mocked<AuthService>;
  let testScheduler: TestScheduler;
  let modalService: NgbModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [NotificationService]
    });

    httpMock = {
      post: jest.fn(),
      get:  jest.fn(),
    } as unknown as jest.Mocked<HttpClient>;

    authService = {
      isVerified: true,
      isLoggedIn: new BehaviorSubject<boolean>(true),
    } as unknown  as jest.Mocked<AuthService>;

    service = new NotificationService(authService, httpMock, modalService);

    testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});

    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO it("simular obtener notificaciones", () => {
  //   const response = { status: 200, data:  [] };
  //   httpMock.get.mockReturnValueOnce(of(response));
  //   const obs$ = service.getNotifications();

  //   testScheduler.run(({ expectObservable }) => {
  //     const expectedMarble = "(---a--|)"; // Diagrama de mármol representando la secuencia de emisión de 'a' seguido por completado '|'
  //     const expectedValues = { a:  of(response) }; // valor emitido 'a' con el valor de 'response'
  //     expectObservable(obs$).toBe(expectedMarble, expectedValues);
  //   });

  //   expect(service).toHaveBeenCalledWith(['']);
  // });
});
