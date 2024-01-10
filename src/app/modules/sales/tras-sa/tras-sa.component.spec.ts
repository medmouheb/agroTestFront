import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrasSAComponent } from "./tras-sa.component";

describe("TrasSAComponent", () => {
  let component: TrasSAComponent;
  let fixture: ComponentFixture<TrasSAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrasSAComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrasSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
