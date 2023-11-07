import { TestBed } from '@angular/core/testing';

import { LoginInterceptor } from './http.interceptor';

describe('CsrfInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LoginInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: LoginInterceptor = TestBed.inject(LoginInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
