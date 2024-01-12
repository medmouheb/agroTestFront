import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmsFormLiveHaulComponent } from './farms-form-live-haul.component';

describe('FarmsFormLiveHaulComponent', () => {
  let component: FarmsFormLiveHaulComponent;
  let fixture: ComponentFixture<FarmsFormLiveHaulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FarmsFormLiveHaulComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmsFormLiveHaulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
