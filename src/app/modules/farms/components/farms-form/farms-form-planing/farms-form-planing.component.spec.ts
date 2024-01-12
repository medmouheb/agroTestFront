import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormPlaningComponent } from './farms-form-planing.component';

describe('FarmsFormPlaningComponent', () => {
  let component: FarmsFormPlaningComponent;
  let fixture: ComponentFixture<FarmsFormPlaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormPlaningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsFormPlaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
