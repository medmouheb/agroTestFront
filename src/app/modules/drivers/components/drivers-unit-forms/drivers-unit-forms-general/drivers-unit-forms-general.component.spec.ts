import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversUnitFormsGeneralComponent } from './drivers-unit-forms-general.component';

describe('DriversUnitFormsGeneralComponent', () => {
  let component: DriversUnitFormsGeneralComponent;
  let fixture: ComponentFixture<DriversUnitFormsGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversUnitFormsGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversUnitFormsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
