import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RapprochementdesStocksFormsSupplementaireComponent } from "./rapprochementdes-stocks-forms-supplementaire.component";

describe("RapprochementdesStocksFormsSupplementaireComponent", () => {
  let component: RapprochementdesStocksFormsSupplementaireComponent;
  let fixture: ComponentFixture<RapprochementdesStocksFormsSupplementaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RapprochementdesStocksFormsSupplementaireComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RapprochementdesStocksFormsSupplementaireComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
