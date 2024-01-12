import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFormGeneralComponent } from './delivery-form-general.component';

describe('DeliveryFormGeneralComponent', () => {
  let component: DeliveryFormGeneralComponent;
  let fixture: ComponentFixture<DeliveryFormGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryFormGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryFormGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
