import { ComponentFixture, TestBed } from "@angular/core/testing";

import { VendorSKUFormComponent } from "./vendor-sku-form.component";

describe("VendorSKUFormComponent", () => {
  let component: VendorSKUFormComponent;
  let fixture: ComponentFixture<VendorSKUFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorSKUFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorSKUFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
