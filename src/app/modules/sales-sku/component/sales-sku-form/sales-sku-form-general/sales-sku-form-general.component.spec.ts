import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SalesSkuFormGeneralComponent } from "./sales-sku-form-general.component";

describe("SalesSkuFormGeneralComponent", () => {
  let component: SalesSkuFormGeneralComponent;
  let fixture: ComponentFixture<SalesSkuFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesSkuFormGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesSkuFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
