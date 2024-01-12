import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FarmsFormContractComponent } from "./farms-form-contract.component";

describe("FarmsFormContractComponent", () => {
  let component: FarmsFormContractComponent;
  let fixture: ComponentFixture<FarmsFormContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmsFormContractComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsFormContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
