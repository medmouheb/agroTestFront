import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeFormsFacilityDetailsComponent } from './vehicule-forms-facility-details.component';

describe('VehiculeFormsFacilityDetailsComponent', () => {
  let component: VehiculeFormsFacilityDetailsComponent;
  let fixture: ComponentFixture<VehiculeFormsFacilityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeFormsFacilityDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeFormsFacilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
