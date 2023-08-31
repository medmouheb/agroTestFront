import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUsageListComponent } from './product-usage-list.component';

describe('ProductUsageListComponent', () => {
  let component: ProductUsageListComponent;
  let fixture: ComponentFixture<ProductUsageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductUsageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUsageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
