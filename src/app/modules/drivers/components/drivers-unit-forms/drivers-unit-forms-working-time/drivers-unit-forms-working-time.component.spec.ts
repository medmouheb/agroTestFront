import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DriversUnitFormsWorkingTimeComponent } from "./drivers-unit-forms-working-time.component";

describe("DriversUnitFormsWorkingTimeComponent", () => {
  let component: DriversUnitFormsWorkingTimeComponent;
  let fixture: ComponentFixture<DriversUnitFormsWorkingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversUnitFormsWorkingTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DriversUnitFormsWorkingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
