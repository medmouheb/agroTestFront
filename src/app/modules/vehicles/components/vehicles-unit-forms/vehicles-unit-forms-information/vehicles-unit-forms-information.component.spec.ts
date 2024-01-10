import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VehiclesUnitFormsInformationComponent } from "./vehicles-unit-forms-information.component";

describe("VehiclesUnitFormsInformationComponent", () => {
  let component: VehiclesUnitFormsInformationComponent;
  let fixture: ComponentFixture<VehiclesUnitFormsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclesUnitFormsInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesUnitFormsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
