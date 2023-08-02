import { TestBed } from '@angular/core/testing';

import { FreightTermsService } from './freight-terms.service';

describe('FreightTermsService', () => {
  let service: FreightTermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreightTermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
