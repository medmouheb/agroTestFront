import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeFormsBinDetailsComponent } from './vehicule-forms-bin-details.component';

describe('VehiculeFormsBinDetailsComponent', () => {
  let component: VehiculeFormsBinDetailsComponent;
  let fixture: ComponentFixture<VehiculeFormsBinDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeFormsBinDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeFormsBinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
