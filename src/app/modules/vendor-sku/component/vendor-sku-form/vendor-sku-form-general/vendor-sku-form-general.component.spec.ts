import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorSKUFormGeneralComponent } from './vendor-sku-form-general.component';

describe('VendorSKUFormGeneralComponent', () => {
  let component: VendorSKUFormGeneralComponent;
  let fixture: ComponentFixture<VendorSKUFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorSKUFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorSKUFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
