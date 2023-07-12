import { TestBed } from '@angular/core/testing';

import { VendorskuService } from './vendorsku.service';

describe('VendorskuService', () => {
  let service: VendorskuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendorskuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
