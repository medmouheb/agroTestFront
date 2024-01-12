import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VehiculeFormsGeneralComponent } from "./vehicule-forms-general.component";

describe("VehiculeFormsGeneralComponent", () => {
  let component: VehiculeFormsGeneralComponent;
  let fixture: ComponentFixture<VehiculeFormsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculeFormsGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculeFormsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
