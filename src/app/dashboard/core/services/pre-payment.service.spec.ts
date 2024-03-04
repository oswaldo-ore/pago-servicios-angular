import { TestBed } from '@angular/core/testing';

import { PrePaymentService } from './pre-payment.service';

describe('PrePaymentService', () => {
  let service: PrePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
