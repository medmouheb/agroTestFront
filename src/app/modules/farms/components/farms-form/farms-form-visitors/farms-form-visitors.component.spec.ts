import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FarmsFormVisitorsComponent } from "./farms-form-visitors.component";

describe("FarmsFormVisitorsComponent", () => {
  let component: FarmsFormVisitorsComponent;
  let fixture: ComponentFixture<FarmsFormVisitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmsFormVisitorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsFormVisitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
