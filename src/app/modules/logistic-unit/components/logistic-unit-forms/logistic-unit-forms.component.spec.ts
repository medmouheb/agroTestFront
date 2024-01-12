import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogisticUnitFormsComponent } from './logistic-unit-forms.component';

describe('LogisticUnitFormsComponent', () => {
  let component: LogisticUnitFormsComponent;
  let fixture: ComponentFixture<LogisticUnitFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogisticUnitFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogisticUnitFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
