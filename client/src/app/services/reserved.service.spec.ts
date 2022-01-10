import { TestBed } from '@angular/core/testing';

import { ReservedService } from './reserved.service';

describe('ReservedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservedService = TestBed.get(ReservedService);
    expect(service).toBeTruthy();
  });
});
