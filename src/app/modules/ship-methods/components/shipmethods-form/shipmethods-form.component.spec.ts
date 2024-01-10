import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShipmethodsFormComponent } from "./shipmethods-form.component";

describe("ShipmethodsFormComponent", () => {
  let component: ShipmethodsFormComponent;
  let fixture: ComponentFixture<ShipmethodsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmethodsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmethodsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
