import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FarmsFormProductComponent } from "./farms-form-product.component";

describe("FarmsFormProductComponent", () => {
  let component: FarmsFormProductComponent;
  let fixture: ComponentFixture<FarmsFormProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmsFormProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsFormProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
