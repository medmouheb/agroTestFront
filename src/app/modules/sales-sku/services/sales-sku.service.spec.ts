import { TestBed } from "@angular/core/testing";

import { SalesSkuService } from "./sales-sku.service";

describe("SalesSkuService", () => {
  let service: SalesSkuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesSkuService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
