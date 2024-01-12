import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DriversUnitListComponent } from "./drivers-unit-list.component";

describe("DriversUnitListComponent", () => {
  let component: DriversUnitListComponent;
  let fixture: ComponentFixture<DriversUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DriversUnitListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DriversUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
