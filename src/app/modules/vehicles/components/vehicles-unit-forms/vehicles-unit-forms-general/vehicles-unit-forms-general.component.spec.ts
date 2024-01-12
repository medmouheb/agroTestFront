import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VehiclesUnitFormsGeneralComponent } from "./vehicles-unit-forms-general.component";

describe("VehiclesUnitFormsGeneralComponent", () => {
  let component: VehiclesUnitFormsGeneralComponent;
  let fixture: ComponentFixture<VehiclesUnitFormsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclesUnitFormsGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesUnitFormsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
