import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapprochementdesStocksFormsInformationComponent } from './rapprochementdes-stocks-forms-information.component';

describe('RapprochementdesStocksFormsInformationComponent', () => {
  let component: RapprochementdesStocksFormsInformationComponent;
  let fixture: ComponentFixture<RapprochementdesStocksFormsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapprochementdesStocksFormsInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapprochementdesStocksFormsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
