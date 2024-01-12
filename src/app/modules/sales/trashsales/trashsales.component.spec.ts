import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrashsalesComponent } from "./trashsales.component";

describe("TrashsalesComponent", () => {
  let component: TrashsalesComponent;
  let fixture: ComponentFixture<TrashsalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrashsalesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrashsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
