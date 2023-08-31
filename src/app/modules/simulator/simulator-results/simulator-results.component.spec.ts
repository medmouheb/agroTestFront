import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorResultsComponent } from './simulator-results.component';

describe('SimulatorResultsComponent', () => {
  let component: SimulatorResultsComponent;
  let fixture: ComponentFixture<SimulatorResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
