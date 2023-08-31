import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUsageFormsDetailsComponent } from './product-usage-forms-details.component';

describe('ProductUsageFormsDetailsComponent', () => {
  let component: ProductUsageFormsDetailsComponent;
  let fixture: ComponentFixture<ProductUsageFormsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUsageFormsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUsageFormsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
