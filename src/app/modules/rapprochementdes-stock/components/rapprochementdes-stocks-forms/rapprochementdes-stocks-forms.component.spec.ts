import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapprochementdesStocksFormsComponent } from './rapprochementdes-stocks-forms.component';

describe('RapprochementdesStocksFormsComponent', () => {
  let component: RapprochementdesStocksFormsComponent;
  let fixture: ComponentFixture<RapprochementdesStocksFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapprochementdesStocksFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RapprochementdesStocksFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
