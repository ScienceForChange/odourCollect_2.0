import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RequestInterceptor } from './request.interceptor';

describe('CsrfInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    
    imports: [HttpClientModule],
    providers: [
      RequestInterceptor
    ]
    
  }));

  it('should be created', () => {
    const interceptor: RequestInterceptor = TestBed.inject(RequestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
