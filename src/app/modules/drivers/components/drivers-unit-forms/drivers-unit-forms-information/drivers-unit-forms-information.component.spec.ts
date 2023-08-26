import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversUnitFormsInformationComponent } from './drivers-unit-forms-information.component';

describe('DriversUnitFormsInformationComponent', () => {
  let component: DriversUnitFormsInformationComponent;
  let fixture: ComponentFixture<DriversUnitFormsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversUnitFormsInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversUnitFormsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
