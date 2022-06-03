import { TestBed } from '@angular/core/testing';

import { RandServiceService } from './rand-service.service';

describe('RandServiceService', () => {
  let service: RandServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
