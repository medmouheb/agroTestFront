import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrashsalesskuComponent } from "./trashsalessku.component";

describe("TrashsalesskuComponent", () => {
  let component: TrashsalesskuComponent;
  let fixture: ComponentFixture<TrashsalesskuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrashsalesskuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrashsalesskuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
