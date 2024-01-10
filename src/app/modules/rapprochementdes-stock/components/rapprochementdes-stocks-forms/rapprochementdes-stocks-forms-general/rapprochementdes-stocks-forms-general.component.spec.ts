import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RapprochementdesStocksFormsGeneralComponent } from "./rapprochementdes-stocks-forms-general.component";

describe("RapprochementdesStocksFormsGeneralComponent", () => {
  let component: RapprochementdesStocksFormsGeneralComponent;
  let fixture: ComponentFixture<RapprochementdesStocksFormsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RapprochementdesStocksFormsGeneralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RapprochementdesStocksFormsGeneralComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
