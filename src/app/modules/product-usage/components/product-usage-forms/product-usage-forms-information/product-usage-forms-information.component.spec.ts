import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductUsageFormsInformationComponent } from "./product-usage-forms-information.component";

describe("ProductUsageFormsInformationComponent", () => {
  let component: ProductUsageFormsInformationComponent;
  let fixture: ComponentFixture<ProductUsageFormsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductUsageFormsInformationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductUsageFormsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
