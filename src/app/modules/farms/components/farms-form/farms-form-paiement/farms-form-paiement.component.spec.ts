import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FarmsFormPaiementComponent } from "./farms-form-paiement.component";

describe("FarmsFormPaiementComponent", () => {
  let component: FarmsFormPaiementComponent;
  let fixture: ComponentFixture<FarmsFormPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmsFormPaiementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsFormPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
