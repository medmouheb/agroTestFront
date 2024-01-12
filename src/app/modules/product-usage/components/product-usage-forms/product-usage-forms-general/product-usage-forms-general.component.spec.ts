import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUsageFormsGeneralComponent } from './product-usage-forms-general.component';

describe('ProductUsageFormsGeneralComponent', () => {
  let component: ProductUsageFormsGeneralComponent;
  let fixture: ComponentFixture<ProductUsageFormsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUsageFormsGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUsageFormsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
