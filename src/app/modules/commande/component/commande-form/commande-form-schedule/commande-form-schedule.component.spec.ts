import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CommandeFormScheduleComponent } from "./commande-form-schedule.component";

describe("CommandeFormScheduleComponent", () => {
  let component: CommandeFormScheduleComponent;
  let fixture: ComponentFixture<CommandeFormScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommandeFormScheduleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandeFormScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
