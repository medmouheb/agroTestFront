import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TrashvendskuComponent } from "./trashvendsku.component";

describe("TrashvendskuComponent", () => {
  let component: TrashvendskuComponent;
  let fixture: ComponentFixture<TrashvendskuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrashvendskuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrashvendskuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
