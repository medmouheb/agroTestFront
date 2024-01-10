import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RapprochementdesStocksFormsPlusComponent } from "./rapprochementdes-stocks-forms-plus.component";

describe("RapprochementdesStocksFormsPlusComponent", () => {
  let component: RapprochementdesStocksFormsPlusComponent;
  let fixture: ComponentFixture<RapprochementdesStocksFormsPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RapprochementdesStocksFormsPlusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RapprochementdesStocksFormsPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
