import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUsageFormsComponent } from './product-usage-forms.component';

describe('ProductUsageFormsComponent', () => {
  let component: ProductUsageFormsComponent;
  let fixture: ComponentFixture<ProductUsageFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUsageFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUsageFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
