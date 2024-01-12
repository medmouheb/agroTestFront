import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapprochementdesStocksFormsDetailsComponent } from './rapprochementdes-stocks-forms-details.component';

describe('RapprochementdesStocksFormsDetailsComponent', () => {
  let component: RapprochementdesStocksFormsDetailsComponent;
  let fixture: ComponentFixture<RapprochementdesStocksFormsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapprochementdesStocksFormsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapprochementdesStocksFormsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
