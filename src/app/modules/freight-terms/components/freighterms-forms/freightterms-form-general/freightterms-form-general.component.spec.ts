import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FreighttermsFormGeneralComponent } from "./freightterms-form-general.component";

describe("FreighttermsFormGeneralComponent", () => {
  let component: FreighttermsFormGeneralComponent;
  let fixture: ComponentFixture<FreighttermsFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreighttermsFormGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FreighttermsFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
