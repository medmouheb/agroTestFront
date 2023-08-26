import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesUnitFormsHistoriqueDeMaintenanceComponent } from './vehicles-unit-forms-historique-de-maintenance.component';

describe('VehiclesUnitFormsHistoriqueDeMaintenanceComponent', () => {
  let component: VehiclesUnitFormsHistoriqueDeMaintenanceComponent;
  let fixture: ComponentFixture<VehiclesUnitFormsHistoriqueDeMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesUnitFormsHistoriqueDeMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesUnitFormsHistoriqueDeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
