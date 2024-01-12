import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VehiculeFormsComponent } from "./vehicule-forms.component";

describe("VehiculeFormsComponent", () => {
  let component: VehiculeFormsComponent;
  let fixture: ComponentFixture<VehiculeFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehiculeFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculeFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
