import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormDistanceComponent } from './farms-form-distance.component';

describe('FarmsFormDistanceComponent', () => {
  let component: FarmsFormDistanceComponent;
  let fixture: ComponentFixture<FarmsFormDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormDistanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsFormDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
