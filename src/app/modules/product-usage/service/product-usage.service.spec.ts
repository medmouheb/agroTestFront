import { TestBed } from "@angular/core/testing";

import { ProductUsageService } from "./product-usage.service";

describe("ProductUsageService", () => {
  let service: ProductUsageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductUsageService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
