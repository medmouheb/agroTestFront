import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypeFormDetailComponent } from './vehicle-type-form-detail.component';

describe('VehicleTypeFormDetailComponent', () => {
  let component: VehicleTypeFormDetailComponent;
  let fixture: ComponentFixture<VehicleTypeFormDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleTypeFormDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypeFormDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
