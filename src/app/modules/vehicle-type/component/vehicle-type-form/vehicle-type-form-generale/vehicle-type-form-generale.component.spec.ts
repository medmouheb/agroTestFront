import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeFormGeneraleComponent } from './vehicle-type-form-generale.component';

describe('VehicleTypeFormGeneraleComponent', () => {
  let component: VehicleTypeFormGeneraleComponent;
  let fixture: ComponentFixture<VehicleTypeFormGeneraleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTypeFormGeneraleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeFormGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
