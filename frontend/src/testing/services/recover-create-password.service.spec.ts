import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RecoverCreatePasswordService } from '../../app/services/recover-create-password.service';

describe('RecoverCreatePasswordService', () => {
  let service: RecoverCreatePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RecoverCreatePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
