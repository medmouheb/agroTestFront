import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FarmsFormFeedmilsComponent } from "./farms-form-feedmils.component";

describe("FarmsFormFeedmilsComponent", () => {
  let component: FarmsFormFeedmilsComponent;
  let fixture: ComponentFixture<FarmsFormFeedmilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmsFormFeedmilsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FarmsFormFeedmilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
