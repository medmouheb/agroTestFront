import { TestBed } from "@angular/core/testing";

import { SvgTransitionService } from "./svg-transition.service";

describe("SvgTransitionService", () => {
  let service: SvgTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgTransitionService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
