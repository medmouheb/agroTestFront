import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ChargeFormGeneralComponent } from "./charge-form-general.component";

describe("ChargeFormGeneralComponent", () => {
  let component: ChargeFormGeneralComponent;
  let fixture: ComponentFixture<ChargeFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChargeFormGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChargeFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
