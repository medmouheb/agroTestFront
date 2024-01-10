import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WillayaFormComponent } from "./willaya-form.component";

describe("WillayaFormComponent", () => {
  let component: WillayaFormComponent;
  let fixture: ComponentFixture<WillayaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WillayaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WillayaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
