import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesSkuFormComponent } from './sales-sku-form.component';

describe('SalesSkuFormComponent', () => {
  let component: SalesSkuFormComponent;
  let fixture: ComponentFixture<SalesSkuFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesSkuFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesSkuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
