import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VehiclesUnitFormsComponent } from "./vehicles-unit-forms.component";

describe("VehiclesUnitFormsComponent", () => {
  let component: VehiclesUnitFormsComponent;
  let fixture: ComponentFixture<VehiclesUnitFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiclesUnitFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesUnitFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
