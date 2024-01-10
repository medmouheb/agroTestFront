import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LogisticUnitFormsGeneralComponent } from "./logistic-unit-forms-general.component";

describe("LogisticUnitFormsGeneralComponent", () => {
  let component: LogisticUnitFormsGeneralComponent;
  let fixture: ComponentFixture<LogisticUnitFormsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticUnitFormsGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogisticUnitFormsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
