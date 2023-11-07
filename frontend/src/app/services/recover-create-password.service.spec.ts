import { TestBed } from '@angular/core/testing';

import { RecoverCreatePasswordService } from './recover-create-password.service';

describe('RecoverCreatePasswordService', () => {
  let service: RecoverCreatePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverCreatePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
