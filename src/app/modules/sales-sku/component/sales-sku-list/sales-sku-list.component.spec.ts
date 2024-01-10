import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SalesSkuListComponent } from "./sales-sku-list.component";

describe("SalesSkuListComponent", () => {
  let component: SalesSkuListComponent;
  let fixture: ComponentFixture<SalesSkuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesSkuListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesSkuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
