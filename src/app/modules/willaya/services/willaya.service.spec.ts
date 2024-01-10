import { TestBed } from "@angular/core/testing";

import { WillayaService } from "./willaya.service";

describe("WillayaService", () => {
  let service: WillayaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WillayaService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
