import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticUnitFormsInformationComponent } from './logistic-unit-forms-information.component';

describe('LogisticUnitFormsInformationComponent', () => {
  let component: LogisticUnitFormsInformationComponent;
  let fixture: ComponentFixture<LogisticUnitFormsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticUnitFormsInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticUnitFormsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
