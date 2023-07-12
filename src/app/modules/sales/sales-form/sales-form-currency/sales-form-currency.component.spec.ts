import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesFormCurrencyComponent } from './sales-form-currency.component';

describe('SalesFormCurrencyComponent', () => {
  let component: SalesFormCurrencyComponent;
  let fixture: ComponentFixture<SalesFormCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesFormCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesFormCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
