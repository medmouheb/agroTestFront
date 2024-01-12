import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorMainPageComponent } from './simulator-main-page.component';

describe('SimulatorMainPageComponent', () => {
  let component: SimulatorMainPageComponent;
  let fixture: ComponentFixture<SimulatorMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimulatorMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
