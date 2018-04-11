import { TestBed, inject } from '@angular/core/testing';

import { AfsprakenService } from './afspraken.service';

describe('AfsprakenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AfsprakenService]
    });
  });

  it('should be created', inject([AfsprakenService], (service: AfsprakenService) => {
    expect(service).toBeTruthy();
  }));
});
