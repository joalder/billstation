import { TestBed, inject } from '@angular/core/testing';

import { DudeService } from './dude.service';

describe('DudeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DudeService]
    });
  });

  it('should be created', inject([DudeService], (service: DudeService) => {
    expect(service).toBeTruthy();
  }));
});
