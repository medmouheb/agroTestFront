import { TestBed } from "@angular/core/testing";

import { LogisticUnitService } from "./logistic-unit.service";

describe("LogisticUnitService", () => {
  let service: LogisticUnitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogisticUnitService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
