import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SalesFormGeneralComponent } from "./sales-form-general.component";

describe("SalesFormGeneralComponent", () => {
  let component: SalesFormGeneralComponent;
  let fixture: ComponentFixture<SalesFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesFormGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
