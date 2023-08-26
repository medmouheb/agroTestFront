import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesUnitListComponent } from './vehicles-unit-list.component';

describe('VehiclesUnitListComponent', () => {
  let component: VehiclesUnitListComponent;
  let fixture: ComponentFixture<VehiclesUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesUnitListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
