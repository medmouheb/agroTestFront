import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FarmsFormProjectionComponent } from "./farms-form-projection.component";

describe("FarmsFormProjectionComponent", () => {
  let component: FarmsFormProjectionComponent;
  let fixture: ComponentFixture<FarmsFormProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmsFormProjectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsFormProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
