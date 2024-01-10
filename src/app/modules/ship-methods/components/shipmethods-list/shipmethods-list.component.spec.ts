import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ShipmethodsListComponent } from "./shipmethods-list.component";

describe("ShipmethodsListComponent", () => {
  let component: ShipmethodsListComponent;
  let fixture: ComponentFixture<ShipmethodsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShipmethodsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmethodsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
