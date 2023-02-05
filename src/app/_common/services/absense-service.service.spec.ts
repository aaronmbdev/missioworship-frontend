import { TestBed } from '@angular/core/testing';

import { AbsenseServiceService } from './absense-service.service';

describe('AbsenseServiceService', () => {
  let service: AbsenseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbsenseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
