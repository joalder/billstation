import { TestBed, inject } from '@angular/core/testing';

import { DebtService } from './debt.service';

describe('DebtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DebtService]
    });
  });

  it('should be created', inject([DebtService], (service: DebtService) => {
    expect(service).toBeTruthy();
  }));
});
