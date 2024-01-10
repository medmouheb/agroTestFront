import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DriversUnitFormsComponent } from "./drivers-unit-forms.component";

describe("DriversUnitFormsComponent", () => {
  let component: DriversUnitFormsComponent;
  let fixture: ComponentFixture<DriversUnitFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversUnitFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DriversUnitFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
