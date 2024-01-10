import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FarmsFormPayeComponent } from "./farms-form-paye.component";

describe("FarmsFormPayeComponent", () => {
  let component: FarmsFormPayeComponent;
  let fixture: ComponentFixture<FarmsFormPayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmsFormPayeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsFormPayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
