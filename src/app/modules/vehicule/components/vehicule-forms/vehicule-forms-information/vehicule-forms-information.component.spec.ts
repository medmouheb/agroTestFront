import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeFormsInformationComponent } from './vehicule-forms-information.component';

describe('VehiculeFormsInformationComponent', () => {
  let component: VehiculeFormsInformationComponent;
  let fixture: ComponentFixture<VehiculeFormsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeFormsInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculeFormsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
