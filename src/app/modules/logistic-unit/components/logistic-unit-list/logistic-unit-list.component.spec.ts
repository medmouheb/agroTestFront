import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LogisticUnitListComponent } from "./logistic-unit-list.component";

describe("LogisticUnitListComponent", () => {
  let component: LogisticUnitListComponent;
  let fixture: ComponentFixture<LogisticUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogisticUnitListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogisticUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
