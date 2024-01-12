import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FreightermsFormsComponent } from "./freighterms-forms.component";

describe("FreightermsFormsComponent", () => {
  let component: FreightermsFormsComponent;
  let fixture: ComponentFixture<FreightermsFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreightermsFormsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FreightermsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
