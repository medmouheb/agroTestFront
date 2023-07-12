import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSKUListComponent } from './vendor-sku-list.component';

describe('VendorSKUListComponent', () => {
  let component: VendorSKUListComponent;
  let fixture: ComponentFixture<VendorSKUListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSKUListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorSKUListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
