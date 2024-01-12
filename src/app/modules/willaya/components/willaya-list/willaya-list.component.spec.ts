import { ComponentFixture, TestBed } from "@angular/core/testing";

import { WillayaListComponent } from "./willaya-list.component";

describe("WillayaListComponent", () => {
  let component: WillayaListComponent;
  let fixture: ComponentFixture<WillayaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WillayaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WillayaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
