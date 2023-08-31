import { TestBed } from '@angular/core/testing';

import { RapprochementdesStockService } from './rapprochementdes-stock.service';

describe('RapprochementdesStockService', () => {
  let service: RapprochementdesStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RapprochementdesStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
