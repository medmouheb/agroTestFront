import { TestBed } from "@angular/core/testing";

import { ShipmethodsService } from "./shipmethods.service";

describe("ShipmethodsService", () => {
  let service: ShipmethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmethodsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
